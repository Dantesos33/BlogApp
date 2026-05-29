import { FaUser } from "react-icons/fa";
import { FaBell, FaBookmark, FaPenToSquare } from "react-icons/fa6";
import NavItem from "./NavItem";

const Navbar = () => {
  return (
    <nav className="flex flex-row-reverse md:flex-row items-center gap-3 md:gap-4 whitespace-nowrap shrink-0">
      <NavItem href="/profile"       icon={<FaUser size={18} />}        label="Profile" />
      <NavItem className="hidden md:flex"
               href="/notifications" icon={<FaBell size={18} />}        label="Notifications" />
      <NavItem className="hidden md:flex"
               href="/bookmarks"     icon={<FaBookmark size={18} />}    label="Bookmarks" />
      <NavItem href="/posts/create"  icon={<FaPenToSquare size={18} />} label="Write" />
    </nav>
  );
};

export default Navbar;