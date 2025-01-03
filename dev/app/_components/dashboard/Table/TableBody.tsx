import { ReactNode } from "react";

type Props<BodyData> = {
  schema: TableSchema<BodyData>[];
  data: Promise<BodyData[]>;
  keyIndex: keyof BodyData;
};

export default async function TableBody<BodyData>({
  schema,
  data,
  keyIndex,
}: Props<BodyData>) {
  const bodyData = await data;
  return (
    <tbody className="">
      {bodyData.map((row, index) => (
        <tr
          className="even:bg-black-tertiery-bg [&>td:first-child]:rounded-ss-lg [&>td:first-child]:rounded-es-lg [&>td:last-child]:rounded-se-lg [&>td:last-child]:rounded-ee-lg"
          key={row[keyIndex] as string}
        >
          <td className="p-3">{index + 1}</td>
          {schema.map((td) => (
            <td className="p-1" key={td.id as string}>
              {td.getData ? td.getData(row[td.id]) : (row[td.id] as ReactNode)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
