import Skeleton from "@/app/_components/skeletons/Skeleton";
import FormSk from "./FormSk";
import cn from "@/app/_utilities/cssConditional";

type Props = {
  maxWidth?: string;
  children?: React.ReactNode;
  className?: string;
};

export default function FormLayoutSkeleton({
  maxWidth = "700px",
  children,
  className,
}: Props) {
  return (
    <div className="px-3">
      <div
        className={cn(
          "dark:bg-black-secondary-bg bg-slate-100 mt-20 mx-auto py-10 px-14 rounded-lg shadow-lg",
          className
        )}
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
