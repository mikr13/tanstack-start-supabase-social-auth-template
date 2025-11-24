import type { Provider } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { useAuthStore } from "@/stores/auth-store";

export const loginFn = createServerFn({ method: "POST" })
  .inputValidator((data: { provider: Provider; redirectTo: string }) => data)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();

    const { error, data: supabaseData } = await supabase.auth.signInWithOAuth({
      provider: data.provider,
      options: {
        redirectTo: data.redirectTo,
      },
    });

    if (error) {
      console.error("OAuth login error:", error);
      return {
        error: true,
        message: error.message,
      };
    }

    throw redirect({
      href: supabaseData.url,
    });
  });

export const Route = createFileRoute("/(auth)/login")({
  component: LoginPage,
});

const LOCALSTORAGE_KEY = "selected-login-method";

function LoginPage() {
  const selectedProvider = useAuthStore((state) => state.selectedProvider);
  const [lastUsed, setLastUsed] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCALSTORAGE_KEY);
      if (stored) setLastUsed(stored);
    } catch {}
  }, []);

  const handleLogin = useMutation({
    mutationFn: (provider: Provider) => {
      localStorage.setItem(LOCALSTORAGE_KEY, provider || "");
      const redirectUrl = `${window.location.origin}/routes/oauth?next=/dashboard`;
      return loginFn({ data: { provider, redirectTo: redirectUrl } });
    },
  });

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Choose your preferred login method</CardDescription>
        <CardAction>
          <ThemeToggle />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Button
            variant="outline"
            className="w-full relative"
            onClick={() => handleLogin.mutate("google")}
            disabled={selectedProvider === "google" || handleLogin.isPending}
          >
            <FaGoogle className="size-4 mr-2" />
            Login with Google
            {lastUsed === "google" && (
              <Badge size="sm" variant="outline" className="absolute right-1">
                Last used
              </Badge>
            )}
          </Button>
          <Button
            variant="outline"
            className="w-full relative"
            onClick={() => handleLogin.mutate("github")}
            disabled={selectedProvider === "github" || handleLogin.isPending}
          >
            <FaGithub className="size-4 mr-2" />
            Login with GitHub
            {lastUsed === "github" && (
              <Badge size="sm" variant="outline" className="absolute right-1">
                Last used
              </Badge>
            )}
          </Button>
          <Button
            variant="outline"
            className="w-full relative"
            onClick={() => handleLogin.mutate("linkedin_oidc")}
            disabled={
              selectedProvider === "linkedin_oidc" || handleLogin.isPending
            }
          >
            <FaLinkedin className="size-4 mr-2" />
            Login with LinkedIn
            {lastUsed === "linkedin_oidc" && (
              <Badge size="sm" variant="outline" className="absolute right-1">
                Last used
              </Badge>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
