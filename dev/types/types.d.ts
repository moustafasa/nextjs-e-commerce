interface Input {
  type: string;
  name: string;
  id: string;
  label: string;
  otherProps?: React.ComponentProps<"input">;
}

interface SideBarLink {
  href: string;
  label: string;
  icon: React.JSX;
}
