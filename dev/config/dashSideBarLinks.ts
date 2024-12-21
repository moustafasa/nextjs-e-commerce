import { BiSolidAddToQueue, BiSolidCategory } from "react-icons/bi";
import { FaProductHunt, FaUser, FaUserPlus } from "react-icons/fa";
import { FaShop, FaTruckRampBox } from "react-icons/fa6";
import { TbCategoryPlus } from "react-icons/tb";

export const dashSideBarLinks = [
  { label: "users", icon: FaUser, href: "/dashboard" },
  { label: "add user", icon: FaUserPlus, href: "/dashboard/users/add" },
  { label: "categories", icon: BiSolidCategory, href: "/dashboard/categories" },
  {
    label: "add category",
    icon: TbCategoryPlus,
    href: "/dashboard/categories/add",
  },
  { label: "products", icon: FaProductHunt, href: "/dashboard/products" },
  {
    label: "add products",
    icon: BiSolidAddToQueue,
    href: "/dashboard/products/add",
  },
  { label: "add to stock", icon: FaTruckRampBox, href: "/dashboard/stock" },
  { label: "orders", icon: FaShop, href: "/dashboard/orders" },
] satisfies SideBarLink[];
