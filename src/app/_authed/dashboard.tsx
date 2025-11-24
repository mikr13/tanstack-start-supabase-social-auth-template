import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  const supabase = getSupabaseServerClient();
  await supabase.auth.signOut();
});

export const Route = createFileRoute("/_authed/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { user } = Route.useRouteContext();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutFn();
    router.navigate({ to: "/" });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={handleLogout} variant="outline">
          Logout
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>
            Your authenticated user data from Supabase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="space-y-4">
            <div>
              <dt className="font-semibold text-sm text-muted-foreground">
                User ID
              </dt>
              <dd className="text-sm font-mono mt-1">{user?.id}</dd>
            </div>
            <div>
              <dt className="font-semibold text-sm text-muted-foreground">
                Email
              </dt>
              <dd className="text-sm mt-1">{user?.email}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Welcome!</CardTitle>
          <CardDescription>
            You're successfully authenticated with Supabase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This is a protected route that requires authentication. You can now
            build your application features here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
