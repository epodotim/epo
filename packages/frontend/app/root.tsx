import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import { AppHandlers, AppProviders } from "~/components/App";
import { ROOT_META } from "~/lib/const";

export const meta: Route.MetaFunction = () => ROOT_META;

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital@1&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Tiny5&display=swap",
  },
];

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const env = context?.cloudflare?.env as Env;
  const cookie = request.headers.get("cookie");

  return {
    cookie,
    ENV: {
      ...env,
    },
  };
};
export type RootLoader = typeof loader;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const ld = useLoaderData();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { location } = useNavigation();
  const isNavigating = Boolean(location);

  return (
    <AppProviders ld={ld}>
      <AppHandlers
        ld={ld}
        navigate={navigate}
        pathname={pathname}
        isNavigating={isNavigating}
      />
      <Outlet />
    </AppProviders>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
