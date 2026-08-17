import { useState } from "react";
import clsx from "clsx";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";

const NAV_ITEMS = [
  { path: "/experience", label: "Experience" },
  { path: "/skills", label: "Skills" },
  { path: "/projects", label: "Projects" },
  { path: "/resume", label: "Resume" },
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-paper/90 backdrop-blur">
      <nav className="mx-auto max-w-5xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-heading text-lg font-medium tracking-tight text-ink">
            <span className="hidden sm:inline">Muhammad Sohaib</span>
            <span className="sm:hidden">M. Sohaib</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <ul className="hidden items-center gap-1 sm:flex sm:gap-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      clsx(
                        "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-ink text-paper"
                          : "text-ink-soft hover:bg-paper-dim hover:text-ink",
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="rounded-full p-2 text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink sm:hidden"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <ul className="mt-4 flex flex-col gap-1 sm:hidden">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    clsx(
                      "block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-ink text-paper"
                        : "text-ink-soft hover:bg-paper-dim hover:text-ink",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
