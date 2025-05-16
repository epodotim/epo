import { Link } from "react-router";
import Logo from "~/components/icons/EPO";
import DarkmodeMenu from "~/components/ui/DarkmodeMenu";
import UserMenu from "~/components/ui/UserMenu";
import { useState } from "react";
import { cn } from "~/lib/utils";
import { List as MenuIcon } from "@phosphor-icons/react";
import { SIDE_MENUS } from "~/components/ui/UserMenu";

export function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrapper">
      <header className="border-accent border-t-6" />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export function AccountLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div className="wrapper">
      <header className="sticky top-0 flex h-14 min-h-14 items-center justify-between border-c2 border-b px-4 content-menu md:pl-64">
        <h1 className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="block md:hidden"
          >
            <MenuIcon size={24} />
          </button>
          <span className="hidden md:flex">{title ?? "Dashboard"}</span>
        </h1>
        <div className="flex items-center gap-2">
          <DarkmodeMenu />
          <UserMenu />
        </div>
      </header>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-60 transform transition-transform duration-100 ease-in-out md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar />
      </div>
      <main className="md:pl-60">{children}</main>
      {isSidebarOpen && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <div
          className="fixed inset-0 z-40 bg-gray-500/10 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export function PostLayout({
  children,
  renderHeader,
}: {
  children: React.ReactNode;
  renderHeader?: React.ReactNode;
}) {
  return (
    <div className="wrapper">
      <header className="sticky top-0 flex h-14 min-h-14 items-center justify-between border-c2 border-b px-4 content-menu">
        {renderHeader ?? <span />}
        <div className="flex items-center gap-2">
          <DarkmodeMenu />
          <UserMenu />
        </div>
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}

const Footer = ({ className = "" }: { className?: string }) => (
  <footer className={className}>
    <Link to="/">
      <p className="flex items-end justify-center text-center font-dot">
        <span className="pr-0.5 pb-0.5">Built with</span>
        <Logo className="h-8 w-8" />
        <span className="pb-0.5 pl-1.5">EPO</span>
      </p>
    </Link>
  </footer>
);

const Sidebar = () => (
  <aside className="min-w-60 bg-gray-100 dark:bg-gray-800">
    <h1 className="flex h-14 items-center justify-center border-c2 border-b text-center">
      <Logo className="h-8 w-8" />
    </h1>
    <ul className="w-full">
      {SIDE_MENUS.map(({ id, icon, text, href }) => (
        <li
          className="block h-12 border-c2 border-b hover:cursor-pointer"
          key={id}
        >
          <Link
            to={href}
            className={cn(
              "hover-bg-c1 flex h-full w-full items-center px-4 py-2 hover:cursor-pointer"
            )}
          >
            <span className="mr-2">{icon}</span>
            <span className="text-sm">{text}</span>
          </Link>
        </li>
      ))}
    </ul>
  </aside>
);
