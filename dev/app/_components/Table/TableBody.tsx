import cn from "@/app/_utilities/cssConditional";
import { ReactNode } from "react";

type Props<BodyData> = {
  schema: TableSchema<BodyData>[];
  data: Promise<BodyData[] | undefined>;
  keyIndex: keyof BodyData;
  zepraBg?: boolean;
  noId?: boolean;
};

export default async function TableBody<BodyData>({
  schema,
  data,
  keyIndex,
  noId,
  zepraBg = true,
}: Props<BodyData>) {
  const bodyData = await data;
  return (
    <tbody className="">
      {bodyData?.map((row, index) => (
        <tr
          className={cn(
            "[&>td:first-child]:rounded-ss-lg [&>td:first-child]:rounded-es-lg [&>td:last-child]:rounded-se-lg [&>td:last-child]:rounded-ee-lg",
            { "dark:even:bg-black-tertiery-bg even:bg-slate-100": zepraBg }
          )}
          key={row[keyIndex] as string}
        >
          {!noId && <td className="p-3">{index + 1}</td>}
          {schema.map((td) => (
            <td className="p-1" key={td.label || (td.id as string)}>
              {td.getData
                ? td.getData(row[td.id], row)
                : (row[td.id] as ReactNode)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
