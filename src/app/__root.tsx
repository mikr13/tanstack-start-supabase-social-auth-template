import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ThemeProvider } from "@/components/theme-provider";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import globalsCss from "./globals.css?url";

const fetchUser = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  if (!data.user?.email) {
    return null;
  }

  return {
    id: data.user.id,
    email: data.user.email,
  };
});

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  beforeLoad: async () => {
    const user = await fetchUser();

    return {
      user,
    };
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start + Supabase Auth Template",
      },
    ],
    links: [{ rel: "stylesheet", href: globalsCss }],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function NotFound() {
  return <main className="flex h-screen items-center justify-center">404</main>;
}

function RootComponent() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-background antialiased w-full mx-auto scroll-smooth">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
