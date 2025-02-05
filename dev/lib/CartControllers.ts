import { cache } from "react";
import { ICartProducts, ICarts } from "./../models/database/Carts";
import { notFound } from "next/navigation";
import { getProductById } from "./productsControllers";
import { OutOfStockError } from "./customErrors";
import Carts from "@/models/database/Carts";
import { HydratedDocument } from "mongoose";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { IProducts } from "@/models/database/Products";
import dbConnect from "@/config/dbConnect";
import Orders, { IOrders, orderStatus } from "@/models/database/Orders";

export const getCart = cache(async () => {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  await dbConnect();

  const cart = await Carts.findOne<HydratedDocument<ICarts>>({
    userId: session.user.userId,
  }).exec();
  return cart;
});

export const getCartPopulated = cache(async (userId: string) => {
  const cart = await Carts.findOne<HydratedDocument<ICarts>>({
    userId,
  })
    .populate<{
      products: (Omit<ICartProducts, "product"> & {
        product: HydratedDocument<
          IProducts & {
            category: { title: string };
          }
        >;
      })[];
    }>({
      path: "products.product",
      populate: {
        path: "category",
        select: "title -_id",
      },
    })
    .exec();
  return cart;
});

export async function addToCart(productId: string, amount: number) {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const product = await getProductById(productId);
  if (!product) {
    notFound();
  }

  let foundCart = await getCart();

  if (!foundCart) {
    foundCart = await Carts.create<HydratedDocument<ICarts>>({
      userId: session.user.userId,
      products: [],
    });
  }

  if (!product.stock || product?.stock < amount) {
    throw new OutOfStockError();
  }

  const foundCartProduct = foundCart?.products.find(
    (prod) => prod.product.toString() === productId
  );

  if (foundCartProduct) {
    if (foundCartProduct.qty + amount > product.stock) {
      throw new OutOfStockError();
    }
    foundCartProduct.qty += amount;
  } else {
    foundCart?.products.push({
      product: productId,
      qty: amount,
    } as unknown as ICartProducts);
  }
  await foundCart?.save();
  revalidatePath("/");
}

export const getCartQuantity = cache(async function () {
  const session = await auth();
  if (!session?.user.userId) return null;
  const cart = await getCart();
  if (!cart) return null;
  return cart.products.length;
});

export const getCartProducts = cache(async function () {
  const session = await auth();
  if (!session?.user.userId) return;
  await dbConnect();

  const cart = await getCartPopulated(session.user.userId.toString());

  return cart?.toObject().products.map((prod) => ({
    ...prod,
    _id: prod._id.toString(),
  }));
});

export const changeCartProductQty = cache(async function (
  productId: string,
  amount: number
) {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  const product = await getProductById(productId);
  if (!product) {
    notFound();
  }

  if (product.stock && product.stock < amount) {
    throw new OutOfStockError();
  }

  const cart = await getCart();

  if (!cart) {
    notFound();
  }

  const foundCartProduct = cart.products.find(
    (prod) => prod.product.toString() === productId
  );

  if (!foundCartProduct) {
    notFound();
  }

  foundCartProduct.qty = amount;
  await cart.save();
  revalidatePath("/");
});

export const getCartTotal = cache(async function () {
  const products = await getCartProducts();

  const totalPrice =
    products?.reduce((curr, prev) => {
      return curr + prev.qty * prev.product.price;
    }, 0) || 0;

  const totalDiscount =
    products?.reduce((curr, prev) => {
      return curr + prev.qty * (prev.product.discount || 0);
    }, 0) || 0;

  return {
    totalPrice,
    totalProductsNumber: products?.length || 0,
    totalDiscount,
  };
});

export const completeCartCheckout = async function (userId: string) {
  const cart = await getCartPopulated(userId);
  if (!cart) {
    throw new Error("there is no cart");
  }

  const savePromises = [];

  for (const product of cart.products) {
    (product.product.stock as number) -= product.qty;
    savePromises.push(product.product.save());
  }

  await Promise.all(savePromises);

  await Orders.create<HydratedDocument<IOrders>>({
    userId: cart.userId,
    products: cart.products.map((cartProduct) => ({
      product: cartProduct.product._id.toString(),
      qty: cartProduct.qty,
    })),
    status: orderStatus.IDLE,
  });

  await cart.deleteOne().exec();
  revalidatePath("/cart");
};
