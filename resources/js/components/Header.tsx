import { useState } from "react";
import { Link } from "@inertiajs/react";
import Searchbar from "@/components/Searchbar";
import Navbar from "./Navbar";
import MobileSidebar from "./MobileSidebar";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
          <div className="flex items-center justify-between gap-3 md:gap-6 lg:gap-10">
            <div className="flex items-center gap-2 shrink-0">
              <button
                aria-label="Open menu"
                onClick={() => setSidebarOpen(true)}
                className="cursor-pointer md:hidden p-2 -ml-1 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
              >
                <FaBars size={18} />
              </button>

              <Link href="/" className="outline-none flex items-center gap-2 cursor-pointer group transition-all duration-300 transform active:scale-95">
                <div className="relative w-9 h-9 md:w-10 md:h-10 overflow-hidden rounded-lg">
                  <img
                    src="/logo.png"
                    alt="BlogApp logo"
                    width={40}
                    height={40}
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="text-brand group-hover:text-blue-600 transition-colors duration-300 whitespace-nowrap">
                  Blog App
                </span>
              </Link>
            </div>

            <div className="hidden md:flex justify-center flex-1 mx-2 lg:mx-4 min-w-0">
              <Searchbar />
            </div>

            <Navbar />
          </div>

          <div className="mt-3 md:hidden">
            <Searchbar className="max-w-full" />
          </div>
        </div>
      </header>

      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
};

export default Header;