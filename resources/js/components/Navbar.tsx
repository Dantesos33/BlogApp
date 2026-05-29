import { useEffect, useRef, useState } from "react";
import { Link, router, usePage } from '@inertiajs/react';
import { FaUser } from "react-icons/fa";
import { FaBookmark, FaPenToSquare, FaChevronDown, FaRightFromBracket } from "react-icons/fa6";
import NavItem from "./NavItem";

const Navbar = () => {
  const { auth } = usePage<{ auth?: { user?: { id?: number; name?: string; email?: string; profile_photo_url?: string } } }>().props;
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setOpen(false);
    router.post('/logout');
  };

  const user = auth?.user;
  const initials = user?.name?.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() || 'U';

  return (
    <nav className="flex flex-row-reverse md:flex-row items-center gap-3 md:gap-4 whitespace-nowrap shrink-0">
      <NavItem className="hidden md:flex" href="/bookmarks" icon={<FaBookmark size={18} />} label="Bookmarks" />
      <NavItem href="/posts/create" icon={<FaPenToSquare size={18} />} label="Write" />

      {user ? (
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:bg-blue-50"
          >
            {user.profile_photo_url ? (
              <img src={user.profile_photo_url} alt={user.name ?? 'Profile'} className="h-8 w-8 rounded-full object-cover" />
            ) : (
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">{initials}</span>
            )}
            <span className="hidden md:inline">{user.name ?? 'Profile'}</span>
            <FaChevronDown size={12} />
          </button>

          {open ? (
            <div className="overflow-hidden absolute right-0 mt-2 w-64 rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/40 ring-1 ring-slate-200 z-50">
              <div className="px-4 py-4">
                <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
              <div className="border-t border-slate-100" />
              <Link
                href="/profile"
                className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-200"
                onClick={() => setOpen(false)}
              >
                Update profile
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-200 cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <Link href="/login" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:bg-blue-50">
          <FaUser size={18} />
          <span className="hidden md:inline">Sign in</span>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;