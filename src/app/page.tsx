import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();
  console.log({ session });
  const IS_ADMIN = process.env.ADMIN_EMAIL === session?.user.email;

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
              {hello ? hello.greeting : "Loading tRPC query..."}
                {session && <span>Logged in as {session.user?.name}</span>}
              {IS_ADMIN && <p>You are admin</p>}
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
          {session?.user && <LatestPost />}
    </HydrateClient>
  );
}
