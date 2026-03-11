"use client";

import Image from "next/image";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("register", { name, email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-black">
      <div className="flex flex-col-reverse md:flex-row items-center w-full max-w-4xl gap-2 px-4">
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="w-48 h-48 md:w-64 md:h-64">
            <Image
              src="/avatar.png"
              alt="animated cartoon"
              width={256}
              height={256}
              className="w-full h-full"
            />
          </div>
          <div className="rope"></div>
        </div>
        <div className="w-full md:w-1/2 p-8 bg-white dark:bg-zinc-800 rounded-lg shadow-lg animate-fade-in relative z-10 md:-ml-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-zinc-900 dark:text-zinc-50">
            Create account
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=" "
                required
                className="peer w-full border-b-2 border-zinc-300 dark:border-zinc-600 bg-transparent py-2 px-1 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <label
                htmlFor="name"
                className="absolute left-1 top-2 text-zinc-500 dark:text-zinc-400 pointer-events-none
                  peer-focus:-translate-y-6 peer-focus:text-indigo-500
                  peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-zinc-400
                  transition-all"
              >
                Full name
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                required
                className="peer w-full border-b-2 border-zinc-300 dark:border-zinc-600 bg-transparent py-2 px-1 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <label
                htmlFor="email"
                className="absolute left-1 top-2 text-zinc-500 dark:text-zinc-400 pointer-events-none
                  peer-focus:-translate-y-6 peer-focus:text-indigo-500
                  peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-zinc-400
                  transition-all"
              >
                Email address
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                required
                className="peer w-full border-b-2 border-zinc-300 dark:border-zinc-600 bg-transparent py-2 px-1 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <label
                htmlFor="password"
                className="absolute left-1 top-2 text-zinc-500 dark:text-zinc-400 pointer-events-none
                  peer-focus:-translate-y-6 peer-focus:text-indigo-500
                  peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-zinc-400
                  transition-all"
              >
                Password
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
