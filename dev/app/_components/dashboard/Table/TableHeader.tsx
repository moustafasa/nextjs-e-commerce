type Props<T> = {
  schema: TableSchema<T>[];
};
export default function TableHeader<T>({ schema }: Props<T>) {
  return (
    <thead>
      <tr>
        <th className="p-3 bg-black-nav  first-of-type:rounded-ss-lg first-of-type:rounded-es-lg last-of-type:rounded-se-lg last-of-type:rounded-ee-lg">
          id
        </th>
        {schema.map((header) => (
          <th
            key={header.id as string}
            className="p-3 bg-black-nav  first-of-type:rounded-ss-lg first-of-type:rounded-es-lg last-of-type:rounded-se-lg last-of-type:rounded-ee-lg"
          >
            {header.label || (header.id as string)}
          </th>
        ))}
      </tr>
    </thead>
  );
}
