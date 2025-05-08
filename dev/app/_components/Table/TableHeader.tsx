type Props<T> = {
  schema: TableSchema<T>[];
  noId?: boolean;
};
export default function TableHeader<T>({ schema, noId }: Props<T>) {
  return (
    <thead>
      <tr className="dark:bg-black-nav bg-gray-200">
        {!noId && (
          <th className="p-3  first-of-type:rounded-ss-lg first-of-type:rounded-es-lg last-of-type:rounded-se-lg last-of-type:rounded-ee-lg">
            id
          </th>
        )}
        {schema.map((header) => (
          <th
            key={header.label || (header.id as string)}
            className="p-3  first-of-type:rounded-ss-lg first-of-type:rounded-es-lg last-of-type:rounded-se-lg last-of-type:rounded-ee-lg"
          >
            {header.label || (header.id as string)}
          </th>
        ))}
      </tr>
    </thead>
  );
}
