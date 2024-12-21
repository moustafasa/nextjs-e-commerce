import Link from "next/link";

type Props = {
  id: string;
  basePath: string;
  // eslint-disable-next-line no-unused-vars
  deleteAction: (id: string) => Promise<void>;
};
export default function OptionsBtn({ id, basePath, deleteAction }: Props) {
  const deleteActionWithId = deleteAction.bind(null, id);
  return (
    <div className="flex gap-3 items-center justify-center px-4">
      <Link
        href={`/${basePath}/edit/${id}`}
        className="py-2 px-3 capitalize transition-colors duration-300 rounded-lg bg-green-800 hover:bg-green-900"
      >
        edit
      </Link>
      <form action={deleteActionWithId}>
        <button className="py-2 px-3 capitalize transition-colors duration-300 rounded-lg bg-red-error hover:bg-red-error-hover">
          delete
        </button>
      </form>
    </div>
  );
}
