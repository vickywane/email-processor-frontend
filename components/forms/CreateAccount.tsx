"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { firebaseApp } from "@/app/page";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  const createAccount = async (e: any) => {
    e.preventDefault();

    try {
      const auth = getAuth(firebaseApp);
      await setPersistence(auth, browserLocalPersistence);
      await createUserWithEmailAndPassword(auth, email, password);

      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to create account", error);
    }
  };

  return (
    <div>
      <br />
      <br />
      <div className="text-center">
        <h1 className="text-2xl">Create An Account</h1>
        <br />
        <hr />
        <br />
      </div>

      <div className="max-w-sm mx-auto">
        <div className="w-full">
          <button
            onClick={createAccount}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            Continue With Google
          </button>
        </div>

        <br />
        <hr />
        <br />
      </div>

      <form method="post" onSubmit={createAccount} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your Name
          </label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="john.doe@example"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your password
          </label>
          <input
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div className="mb-5 flex flex-row justify-between">
          <p className="text-gray-500">Already have an account?</p>

          <Link href={"/authenticate"}>
            <p>Sign In </p>
          </Link>
        </div>

        <div className="w-full">
          <button
            onClick={createAccount}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}
