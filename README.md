# TanStack Start + Supabase Social Auth Template

A modern, production-ready template for building full-stack React applications with social authentication using TanStack Start and Supabase.

## Features

- ⚡️ **TanStack Start** - Full-stack React framework with SSR
- 🔐 **Supabase Authentication** - Social OAuth (Google, GitHub, LinkedIn)
- 🛡️ **Protected Routes** - Automatic authentication guards
- 🎨 **Tailwind CSS v4** - Modern styling with CSS variables
- 📱 **Responsive Design** - Mobile-first approach
- 🌙 **Dark Mode** - Built-in dark mode support
- 📦 **TypeScript** - Full type safety
- 🚀 **Bun Runtime** - Fast package management and runtime

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed
- [Supabase](https://supabase.com) account

### 1. Clone the template

```bash
git clone <your-repo-url>
cd tanstack-start-supabase-template
```

### 2. Install dependencies

```bash
bun install
```

### 3. Set up Supabase

1. Create a new project on [Supabase](https://supabase.com)
2. Go to **Authentication** → **Providers** and enable:
   - Google
   - GitHub
   - LinkedIn (optional)
3. Configure OAuth redirect URLs:
   - For local development: `http://localhost:3000/routes/oauth`
   - For production: `https://yourdomain.com/routes/oauth`

### 4. Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

### 5. Run the development server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## Project Structure

```
src/
├── app/                      # TanStack Router routes
│   ├── __root.tsx           # Root layout
│   ├── index.tsx            # Landing page
│   ├── _authed.tsx          # Authenticated layout
│   ├── _authed/
│   │   └── dashboard.tsx    # Protected dashboard
│   ├── (auth)/
│   │   ├── route.tsx        # Auth layout
│   │   └── login.tsx        # Login page
│   └── routes/
│       └── oauth.ts         # OAuth callback handler
├── components/
│   └── ui/                  # UI components
│       ├── button.tsx
│       └── card.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts        # Browser Supabase client
│   │   └── server.ts        # Server Supabase client
│   └── utils.ts             # Utility functions
└── stores/
    └── auth-store.ts        # Auth state management
```

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Lint and format code
- `bun run type-check` - Run TypeScript type checking

## Authentication Flow

1. User clicks "Login" and selects a provider (Google, GitHub, LinkedIn)
2. User is redirected to the OAuth provider
3. After authentication, provider redirects to `/routes/oauth`
4. OAuth handler exchanges code for session
5. User is redirected to `/dashboard`
6. Protected routes check authentication in `beforeLoad`

## Adding New Protected Routes

Create a new route under `_authed`:

```tsx
// src/app/_authed/profile.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/profile")({
  component: Profile,
});

function Profile() {
  const { user } = Route.useRouteContext();
  return <div>Profile for {user?.email}</div>;
}
```

## Customization

### Styling

The template uses Tailwind CSS v4 with CSS variables. Modify colors in `src/app/globals.css`:

```css
@theme {
  --color-primary: oklch(9% 0 0);
  --color-secondary: oklch(96% 0 0);
  /* ... */
}
```

### OAuth Providers

To add/remove providers, edit:

- `src/app/(auth)/login.tsx` - Add/remove login buttons
- Supabase dashboard - Enable/disable providers

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Other Platforms

Build the production bundle:

```bash
bun run build
```

The output will be in `.output/`. Deploy the `server` folder.

## Common Issues

### OAuth redirects not working

Make sure your redirect URLs match exactly in:

- Supabase dashboard (Authentication → URL Configuration)
- OAuth provider settings (Google Console, GitHub Apps, etc.)

### Session not persisting

Check that cookies are enabled and your domain configuration is correct in Supabase.

## Learn More

- [TanStack Start Documentation](https://tanstack.com/start)
- [TanStack Router Documentation](https://tanstack.com/router)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS v4](https://tailwindcss.com)

## License

MIT
