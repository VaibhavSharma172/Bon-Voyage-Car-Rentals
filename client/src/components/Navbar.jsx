import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner } = useAppContext();

  const [open, setOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    { name: "Bookings", path: "/my-bookings" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-[#0B0B0B]/10 bg-lime-500 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
<Link to="/" className="flex items-center gap-3">
<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B0B0B] text-[#F59E0B] font-extrabold text-xl shadow-md">
BV
</div>
 
<div className="flex flex-col leading-none">
<span className="text-xl font-bold text-[#0B0B0B]">
Bon Voyage
</span>
 
<span className="text-[10px] uppercase tracking-[0.3em] text-[#0B0B0B]/70">
Car Rentals
</span>
</div>
</Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-lg font-semibold transition-colors ${
                  isActive(link.path)
                    ? "text-[#4F46E5]"
                    : "text-[#0B0B0B]/60 hover:text-[#0B0B0B]"
                }`}
              >
                {link.name}

                {isActive(link.path) && (
                  <span className="absolute -bottom-[29px] left-0 right-0 h-0.5 bg-[#4F46E5]" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-5 md:flex">
            <button
              type="button"
              className="cursor-pointer text-[#0B0B0B]/50 transition-colors hover:text-[#4F46E5]"
            >
              <Search size={18} />
            </button>

            {isOwner && (
              <button
                type="button"
                onClick={() => navigate("/owner")}
                className="cursor-pointer text-sm font-medium text-[#0B0B0B]/60 transition-colors hover:text-[#4F46E5]"
              >
                Dashboard
              </button>
            )}

            <button
              type="button"
              onClick={() =>
                user ? logout() : setShowLogin(true)
              }
              className="cursor-pointer rounded-full bg-[#4F46E5] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#F59E0B]
"
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="cursor-pointer text-[#0B0B0B] transition-colors hover:text-[#4F46E5] md:hidden"
            aria-label="Toggle Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed left-0 right-0 top-20 border-t border-[#0B0B0B]/10 bg-[#F5F5F5]
 shadow-lg md:hidden">
          <div className="flex flex-col gap-1 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-[#4F46E5]/10 text-[#4F46E5]"
                    : "text-[#0B0B0B]/70 hover:bg-[#F5F5F5]"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {isOwner && (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  navigate("/owner");
                }}
                className="rounded-lg px-4 py-3 text-left text-sm font-medium text-[#0B0B0B]/70 hover:bg-[#F5F5F5]"
              >
                Dashboard
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setOpen(false);

                if (user) {
                  logout();
                } else {
                  setShowLogin(true);
                }
              }}
              className="mt-3 rounded-xl bg-[#4F46E5] py-3 font-medium text-white"
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;