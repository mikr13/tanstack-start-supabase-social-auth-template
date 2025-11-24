import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/_authed")({
  component: AuthenticatedLayout,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: "/login",
      });
    }
  },
});

function AuthenticatedLayout() {
  return (
    <div className="min-h-screen">
      <header className="border-b flex justify-between items-center py-4 px-6">
        <h1 className="text-xl font-bold">My App</h1>
        <ThemeToggle />
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
