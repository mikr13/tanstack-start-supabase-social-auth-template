import { createFileRoute } from "@tanstack/react-router";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const Route = createFileRoute("/routes/oauth")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { searchParams, origin } = new URL(request.url);
        const code = searchParams.get("code");
        let next = searchParams.get("next") ?? "/dashboard";

        if (!next.startsWith("/")) {
          next = "/dashboard";
        }

        if (code) {
          const supabase = getSupabaseServerClient();
          const { data, error } =
            await supabase.auth.exchangeCodeForSession(code);

          if (!error && data.session) {
            const forwardedHost = request.headers.get("x-forwarded-host");
            const isLocalEnv = process.env.NODE_ENV === "development";

            let redirectUrl: string;

            if (isLocalEnv) {
              redirectUrl = `${origin}${next}`;
            } else if (forwardedHost) {
              redirectUrl = `https://${forwardedHost}${next}`;
            } else {
              redirectUrl = `${origin}${next}`;
            }

            return new Response(null, {
              status: 302,
              headers: {
                Location: redirectUrl,
              },
            });
          }
        }

        return new Response(null, {
          status: 302,
          headers: {
            Location: `${origin}/login?error=oauth_failed`,
          },
        });
      },
    },
  },
});
