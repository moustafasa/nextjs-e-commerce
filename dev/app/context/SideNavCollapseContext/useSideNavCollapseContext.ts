import { useContext } from "react";
import { sideNavCollapseContext } from "./sideNavCollapseContext";

export default function useSideNavCollapse() {
  const collapseContext = useContext(sideNavCollapseContext);
  return collapseContext;
}
