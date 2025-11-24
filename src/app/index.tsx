import { createFileRoute, Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { user } = Route.useRouteContext();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">
          TanStack Start + Supabase Auth Template
        </h1>
        <p className="text-xl text-muted-foreground">
          A simple template with social authentication using Supabase
        </p>

        <div className="flex gap-4 justify-center mt-8">
          <ThemeToggle />
          {user ? (
            <Link to="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button size="lg">Login</Button>
            </Link>
          )}
        </div>

        <div className="mt-12 p-6 bg-muted rounded-lg max-w-md mx-auto">
          <h2 className="text-lg font-semibold mb-2">Features:</h2>
          <ul className="text-left space-y-2">
            <li>✅ TanStack Start (React Router + SSR)</li>
            <li>✅ Supabase Authentication</li>
            <li>✅ Social OAuth (Google, GitHub, LinkedIn)</li>
            <li>✅ Protected Routes</li>
            <li>✅ TypeScript</li>
            <li>✅ Tailwind CSS</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
