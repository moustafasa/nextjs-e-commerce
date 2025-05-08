import TableBodySkeleton from "@/app/_components/skeletons/TableBodySkeleton";
import TableLayoutSk from "@/app/_components/skeletons/TableLayOutSkeleton";
import { PRODUCTS_LIMIT } from "@/config/constants";

export default function loading() {
  <TableLayoutSk headerNum={5} addBtn>
    <TableBodySkeleton<Record<string, string>>
      noId
      schema={Array(5)
        .fill(0)
        .map((_, index) => ({ id: index.toString() }))}
      specificNumber={PRODUCTS_LIMIT}
    />
  </TableLayoutSk>;
}
