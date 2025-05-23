import TableLayoutSk from "@/app/_components/skeletons/TableLayOutSkeleton";
import schema from "./_config/Schema";
import TableBodySkeleton from "@/app/_components/skeletons/TableBodySkeleton";
import CartTotalSk from "./_components/CartTotalSk";
import FormButtonSk from "@/app/_components/skeletons/FormButtonSk";

export default function loading() {
  return (
    <>
      <TableLayoutSk headerNum={schema.length}>
        <TableBodySkeleton
          schema={schema}
          zepraBg={false}
          noId
          specificNumber={1}
        />
      </TableLayoutSk>
      <CartTotalSk />
      <div className="mt-7 px-5 flex items-center justify-center [&>button]:w-full">
        <FormButtonSk />
      </div>
    </>
  );
}
