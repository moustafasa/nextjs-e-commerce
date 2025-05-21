import { BiSolidAddToQueue, BiSolidCategory } from "react-icons/bi";
import { FaProductHunt, FaUser, FaUserPlus } from "react-icons/fa";
import { FaShop, FaTruckRampBox } from "react-icons/fa6";
import { TbCategoryPlus } from "react-icons/tb";
import { Role } from "./constants";

export const dashSideBarLinks = [
  { label: "users", icon: FaUser, href: "/dashboard", role: [Role.ADMIN] },
  {
    label: "add user",
    icon: FaUserPlus,
    href: "/dashboard/users/add",
    role: [Role.ADMIN],
  },
  {
    label: "categories",
    icon: BiSolidCategory,
    href: "/dashboard/categories",
    role: [Role.WRITER, Role.ADMIN],
  },
  {
    label: "add category",
    icon: TbCategoryPlus,
    href: "/dashboard/categories/add",
    role: [Role.WRITER, Role.ADMIN],
  },
  {
    label: "products",
    icon: FaProductHunt,
    href: "/dashboard/products",
    role: [Role.WRITER, Role.ADMIN],
  },
  {
    label: "add products",
    icon: BiSolidAddToQueue,
    href: "/dashboard/products/add",
    role: [Role.WRITER, Role.ADMIN],
  },
  {
    label: "add to stock",
    icon: FaTruckRampBox,
    href: "/dashboard/stock",
    role: [Role.WRITER, Role.ADMIN],
  },
  {
    label: "orders",
    icon: FaShop,
    href: "/dashboard/orders",

    role: [Role.ORDER_REPORTER, Role.ADMIN],
  },
] satisfies SideBarLink[];
