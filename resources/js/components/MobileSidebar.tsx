import { Link, router, usePage } from "@inertiajs/react";
import {
  FaXmark, FaHouse, FaList, FaBookmark,
  FaPenToSquare, FaGlobe, FaHeadset, FaCircleInfo,
} from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/",             icon: <FaHouse size={15} />,        label: "Home" },
  { href: "/categories",   icon: <FaList size={15} />,         label: "Categories" },
  { href: "/bookmarks",    icon: <FaBookmark size={15} />,     label: "Bookmarks" },
  { href: "/posts/create", icon: <FaPenToSquare size={15} />,  label: "Write a post" },
];

const utilLinks = [
  { href: "/",        icon: <FaGlobe size={15} />,       label: "English" },
  { href: "/contact", icon: <FaHeadset size={15} />,     label: "Contact us" },
  { href: "/about",   icon: <FaCircleInfo size={15} />,  label: "About" },
];

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Write a post", href: "/posts/create" },
];

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const { auth } = usePage<{ auth?: { user?: { name?: string; email?: string; id?: number } } }>().props;
  const user = auth?.user;

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-60 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={`fixed top-0 left-0 h-full w-[75vw] max-w-75 bg-white z-70 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <FaUser size={16} className="text-slate-400" />
              </div>
              <p className="text-ui font-medium leading-tight">
                {/* Show auth-aware header links */}
                {user ? (
                  <>
                    <span className="block text-sm text-slate-900">{user.name}</span>
                    <span className="block text-xs text-slate-500">{user.email}</span>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={onClose} className="cursor-pointer hover:text-blue-600 transition-colors">
                      Sign in
                    </Link>
                    <span className="text-slate-300 mx-1">|</span>
                    <Link href="/register" onClick={onClose} className="cursor-pointer hover:text-blue-600 transition-colors">
                      Register
                    </Link>
                  </>
                )}
              </p>
            </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="cursor-pointer p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
          >
            <FaXmark size={18} />
          </button>
        </div>

        <nav className="flex flex-col py-2">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="cursor-pointer flex items-center gap-4 px-5 py-3.5 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group"
            >
              <span className="text-slate-400 group-hover:text-blue-500 transition-colors">
                {item.icon}
              </span>
              <span className="text-ui font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="h-px bg-slate-100 mx-4" />

        <nav className="flex flex-col py-2">
          {utilLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="cursor-pointer flex items-center gap-4 px-5 py-3.5 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group"
            >
              <span className="text-slate-400 group-hover:text-blue-500 transition-colors">
                {item.icon}
              </span>
              <span className="text-ui font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-5 pb-8 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
          {user ? (
            <>
              <Link href="/profile" onClick={() => { onClose(); }} className="cursor-pointer text-ui hover:text-blue-500 transition-colors duration-200">Update profile</Link>
              <Link href="/bookmarks" onClick={() => { onClose(); }} className="cursor-pointer text-ui hover:text-blue-500 transition-colors duration-200">Bookmarks</Link>
              <Link href="/posts/create" onClick={() => { onClose(); }} className="cursor-pointer text-ui hover:text-blue-500 transition-colors duration-200">Write a post</Link>
                    <button
                type="button"
                onClick={() => { onClose(); router.post('/logout'); }}
                      className="cursor-pointer text-left text-ui text-rose-600 hover:text-rose-800 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            footerLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="cursor-pointer text-caption hover:text-blue-500 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))
          )}
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;