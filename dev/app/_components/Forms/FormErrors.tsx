import { BiSolidErrorCircle } from "react-icons/bi";

type Props = { errors?: string[] };
export default function FormErrors({ errors }: Props) {
  return (
    <div className="bg-red-950 p-3 mb-5 rounded-lg empty:hidden">
      {errors?.map((err) => (
        <p key={err} className="flex items-center gap-3 text-red-error">
          <span>
            <BiSolidErrorCircle size={40} />
          </span>
          {err}
        </p>
      ))}
    </div>
  );
}
