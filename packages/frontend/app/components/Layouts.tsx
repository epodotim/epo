import { Link } from "react-router";
import Logo from "~/components/icons/EPO";
import DarkmodeMenu from "~/components/ui/DarkmodeMenu";
import UserMenu from "~/components/ui/UserMenu";

export function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrapper">
      <header className="border-accent border-t-6" />
      <main>{children}</main>
      <Footer />
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

const Footer = () => (
  <footer>
    <Link to="/">
      <p className="flex items-end justify-center text-center font-dot">
        <span className="pr-0.5 pb-0.5">Built with</span>
        <Logo className="h-8 w-8" />
        <span className="pb-0.5 pl-1.5">EPO</span>
      </p>
    </Link>
  </footer>
);
