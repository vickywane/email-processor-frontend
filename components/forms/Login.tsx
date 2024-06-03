"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { firebaseApp } from "@/utils/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const createAccount = async (e: any) => {
    e.preventDefault();

    try {
      const auth = getAuth(firebaseApp);

      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const authWithGoogle = async (e: any) => {
    e.preventDefault();

    try {
      const auth = getAuth(firebaseApp);
      const provider = new GoogleAuthProvider();

      await setPersistence(auth, browserLocalPersistence);
      await signInWithPopup(auth, provider);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <br />
      <br />
      <div className="text-center">
        <h1 className="text-2xl">Login</h1>
        <br />
        <hr />
        <br />
      </div>

      <div className="max-w-sm mx-auto">
        <div className="w-full">
          <button
            onClick={authWithGoogle}
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
          <p className="text-gray-500">Dont have an account?</p>

          <Link href={"/"}>
            <p>Create Account </p>
          </Link>
        </div>

        <div className="w-full">
          <button
            onClick={createAccount}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
