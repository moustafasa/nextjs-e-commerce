import SettingsHeading from "@/app/(UsersRoutes)/settings/_components/SettingsHeading";
import SettingsLayout from "@/app/(UsersRoutes)/settings/_components/SettingsLayout";
import SettingsNav from "@/app/(UsersRoutes)/settings/_components/SettingsNav";
import SettingsLayoutErrorsContext from "@/app/_utilities/SettingsLayoutErrorsContext/settingsLayoutErrorContext";
import { type ReactNode } from "react";

type Props = { children: ReactNode };
export default function layout({ children }: Props) {
  return (
    <SettingsLayoutErrorsContext>
      <SettingsLayout>
        <div className="grid grid-cols-[minmax(100px,20%),1fr] gap-x-10 grid-flow-col gap-y-3 pb-4">
          <SettingsHeading />
          <div className="row-start-2 col-span-2 grid-flow-col grid grid-cols-[minmax(100px,20%),1fr] gap-x-10">
            <div className="">
              <SettingsNav />
            </div>
            <div className="col-start-2">{children}</div>
          </div>
        </div>
      </SettingsLayout>
    </SettingsLayoutErrorsContext>
  );
}
