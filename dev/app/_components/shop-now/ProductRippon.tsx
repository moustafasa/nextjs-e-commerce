type Props = { discountPercent: number };
export default function ProductRippon({ discountPercent }: Props) {
  return (
    <div className="absolute top-[15px] left-[-35px] -rotate-45 before:absolute before:border-[6px] z-50  before:border-l-transparent before:border-r-transparent before:border-b-transparent before:border-t-red-error-hover  before:z-50 before:translate-y-full before:bottom-0 before:left-0 after:absolute after:border-[6px]  after:border-l-transparent after:border-r-transparent after:border-b-transparent after:border-t-red-error-hover  after:z-50 after:translate-y-full after:bottom-0 after:right-0">
      <span className="bg-red-error-hover w-[120px] flex items-center justify-center rippon-before capitalize font-bold ">
        up to {discountPercent}%
      </span>
    </div>
  );
}
