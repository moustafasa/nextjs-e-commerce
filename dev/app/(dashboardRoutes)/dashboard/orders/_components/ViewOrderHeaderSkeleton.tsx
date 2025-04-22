import Skeleton from "../../../../_components/skeletons/Skeleton";

export default function ViewOrderHeaderSkeleton() {
  return (
    <table className="w-full border-[1px] table-fixed rounded-lg border-separate ">
      <tbody>
        <tr>
          <th className="p-3">order id </th>
          <th className="p-4 w-[50px]"> : </th>
          <td className="p-3 text-center">
            <Skeleton classNames="sk-text" />
          </td>
        </tr>
        <tr>
          <th className="p-3">order owner </th>
          <th className="p-4"> : </th>
          <td className="p-3 text-center">
            <Skeleton classNames="sk-text" />
          </td>
        </tr>
        <tr>
          <th className="p-3">total price </th>
          <th className="p-4"> : </th>
          <td className="p-3 text-center">
            <Skeleton classNames="sk-text" />
          </td>
        </tr>
        <tr>
          <th className="p-3">status </th>
          <th className="p-4"> : </th>
          <td className="p-3">
            <div className="p-10 flex gap-2 justify-center items-center">
              <Skeleton classNames="sk-input" />
              <Skeleton classNames="sk-button justify-self-end" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
