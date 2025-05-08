import Skeleton from "@/app/_components/skeletons/Skeleton";
import FormSk from "./FormSk";

type Props = {
  maxWidth?: string;
  children?: React.ReactNode;
};

export default function FormLayoutSkeleton({
  maxWidth = "700px",
  children,
}: Props) {
  return (
    <div className="px-3">
      <div
        className=" dark:bg-black-secondary-bg bg-slate-100 mt-20 mx-auto py-10 px-14 rounded-lg shadow-lg"
        style={{ maxWidth }}
      >
        <Skeleton classNames="sk-header w-1/3 mb-6 mx-auto" />
        <div className="space-y-4">
          <FormSk> {children} </FormSk>
        </div>
      </div>
    </div>
  );
}
