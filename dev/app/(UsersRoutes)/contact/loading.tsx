import FormLayoutSkeleton from "@/app/_components/skeletons/FormLayoutSk";
import Skeleton from "@/app/_components/skeletons/Skeleton";
import { inputs } from "./_config/inputs";
import FormFieldSkeleton from "@/app/_components/skeletons/FormFieldSk";

export default function loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="md:col-span-1 space-y-6">
          <h2 className="mb-4">
            <Skeleton classNames="sk-header w-[200px]" />
          </h2>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 ">
              <Skeleton classNames="sk-icon" />
              <Skeleton classNames="sk-text w-[150px]" />
            </div>

            <div className="flex items-center space-x-3 ">
              <Skeleton classNames="sk-icon" />
              <Skeleton classNames="sk-text w-[150px]" />
            </div>

            <div className="flex items-center space-x-3 dark:text-gray-icons">
              <Skeleton classNames="sk-icon" />
              <Skeleton classNames="sk-text w-[200px]" />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              <Skeleton classNames="sk-header w-[200px]" />
            </h3>
            <div className="space-y-2 dark:text-gray-icons">
              <Skeleton classNames="sk-text w-1/2" />
              <Skeleton classNames="sk-text w-1/3" />
              <Skeleton classNames="sk-text w-1/4" />
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <FormLayoutSkeleton className="mt-0">
            {inputs.map((input) => (
              <FormFieldSkeleton key={input.id} type={input.type} />
            ))}
          </FormLayoutSkeleton>
        </div>
      </div>
    </div>
  );
}
