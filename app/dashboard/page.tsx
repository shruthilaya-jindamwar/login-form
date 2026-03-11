import { redirect } from "next/navigation";
import { getSession, clearSession } from "@/lib/actions";

export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const handleLogout = async () => {
    "use server";
    await clearSession();
    redirect("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-6 text-center">
        <div className="rounded-full bg-indigo-100 dark:bg-indigo-900 p-8">
          <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
            Welcome, {session.name}!
          </h1>
        </div>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          You have successfully logged in.
        </p>
        <form action={handleLogout}>
          <button
            type="submit"
            className="mt-4 rounded-full border border-red-300 bg-red-50 px-6 py-2 text-red-600 hover:bg-red-100 dark:border-red-700 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
          >
            Log out
          </button>
        </form>
      </main>
    </div>
  );
}
