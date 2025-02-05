type Props = { title: string };
export default function PageHeader({ title }: Props) {
  return (
    <h2 className="text-2xl capitalize font-bold text-center mb-9">
      <span className="relative before:absolute before:w-[60%] before:h-[1px] before:bg-white before:bottom-0 before:left-[20%]">
        {title}
      </span>
    </h2>
  );
}
