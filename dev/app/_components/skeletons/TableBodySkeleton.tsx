import { cn } from "@/lib/utils";
import Skeleton from "./Skeleton";

type Props<BodyData> = {
  schema: TableSchema<BodyData>[];
  zepraBg?: boolean;
  noId?: boolean;
  specificNumber?: number;
};

export default async function TableBodySkeleton<BodyData>({
  schema,
  noId,
  zepraBg = true,
  specificNumber = 5,
}: Props<BodyData>) {
  return (
    <tbody className="">
      {Array(specificNumber)
        .fill(0)
        ?.map((_, index) => (
          <tr
            className={cn(
              "[&>td:first-child]:rounded-ss-lg [&>td:first-child]:rounded-es-lg [&>td:last-child]:rounded-se-lg [&>td:last-child]:rounded-ee-lg group",
              { "dark:even:bg-black-tertiery-bg even:bg-slate-100": zepraBg }
            )}
            key={index}
          >
            {!noId && (
              <td className="p-3 ">
                <Skeleton
                  classNames={`sk-text  ${
                    zepraBg && "dark:group-even:bg-black-bg"
                  }`}
                />
              </td>
            )}
            {schema.map((td) => (
              <td className="p-1" key={td.label || (td.id as string)}>
                {td.label === "options" && !td.skeletonData ? (
                  <div className="flex gap-3 items-center justify-center px-4">
                    <Skeleton
                      classNames={`sk-button ${
                        zepraBg && "dark:group-even:bg-black-bg"
                      }`}
                    />
                    <Skeleton
                      classNames={`sk-button ${
                        zepraBg && "dark:group-even:bg-black-bg"
                      }`}
                    />
                  </div>
                ) : td.skeletonData ? (
                  td.skeletonData(zepraBg)
                ) : (
                  <Skeleton
                    classNames={`sk-text min-w-20 ${
                      zepraBg && "dark:group-even:bg-black-bg"
                    }`}
                  />
                )}
              </td>
            ))}
          </tr>
        ))}
    </tbody>
  );
}
