import { ReactNode } from "react";

type Props = {
  menuButton?: ReactNode;
};

export const Navbar = ({ menuButton }: Props) => (
  <nav className="h-14 border-b border-gray-200 px-6 flex items-center gap-3 shrink-0">
    {menuButton}
    <span className="text-xl font-bold">Vehicle Query Engine</span>
  </nav>
);
