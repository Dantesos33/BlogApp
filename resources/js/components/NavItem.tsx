import { Link } from "@inertiajs/react";
import { ReactNode } from "react";

interface NavItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  className?: string;
}

const NavItem = ({ href, icon, label, className = "" }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1.5 text-slate-600 hover:text-blue-600 transition-all duration-300 transform hover:scale-105 group ${className}`}
    >
      <div className="p-2 rounded-xl group-hover:bg-blue-50 transition-colors duration-300">
        {icon}
      </div>
      <div className="text-caption md:text-ui font-medium hidden md:block">
        {label}
      </div>
    </Link>
  );
};

export default NavItem;