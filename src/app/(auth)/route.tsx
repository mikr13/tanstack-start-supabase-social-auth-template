import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Outlet />
    </main>
  );
}
