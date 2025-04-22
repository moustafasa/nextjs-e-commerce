import TableBodySkeleton from "@/app/_components/skeletons/TableBodySkeleton";
import TableLayoutSk from "@/app/_components/skeletons/TableLayOutSkeleton";

export default function loading() {
  <TableLayoutSk headerNum={5} addBtn>
    <TableBodySkeleton<Record<string, string>>
      schema={Array(5)
        .fill(0)
        .map((_, index) => ({ id: index.toString() }))}
    />
  </TableLayoutSk>
}
