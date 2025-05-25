import SettingsHeading from "@/app/(UsersRoutes)/settings/_components/SettingsHeading";
import SettingsLayout from "@/app/(UsersRoutes)/settings/_components/SettingsLayout";
import SettingsNav from "@/app/(UsersRoutes)/settings/_components/SettingsNav";
import SettingsLayoutErrorsContext from "@/app/context/SettingsLayoutErrorsContext/settingsLayoutErrorContext";
import { type ReactNode } from "react";

type Props = { children: ReactNode };
export default function layout({ children }: Props) {
  return (
    <SettingsLayoutErrorsContext>
      <SettingsLayout>
        <div className="sm:grid grid-cols-[minmax(100px,20%),1fr] gap-x-10 grid-flow-col gap-y-3 pb-4">
          <SettingsHeading />
          <div className="row-start-2 col-span-2  sm:col-span-2 sm:grid-flow-col grid sm:grid-cols-[minmax(100px,20%),1fr] gap-x-10 ">
            <SettingsNav />
            {children}
          </div>
        </div>
      </SettingsLayout>
    </SettingsLayoutErrorsContext>
  );
}
