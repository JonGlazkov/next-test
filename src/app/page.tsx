"use client";
import SignIn from "@/components/sign-in/signIn";
import SignUp from "@/components/sign-up/signUp";
import { useState } from "react";

export enum TabsType {
  SIGN_IN = "sign-in",
  SIGN_UP = "sign-up",
}

export default function Home() {
  const [tab, setTab] = useState(TabsType.SIGN_IN);

  const handleTabChange = () => {
    setTab((prevTab) =>
      prevTab === TabsType.SIGN_IN ? TabsType.SIGN_UP : TabsType.SIGN_IN
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleTabChange}
        className="absolute top-6 left-6 bg-indigo-600 text-white font-semibold py-2 px-4 rounded"
      >
        {tab === TabsType.SIGN_IN ? "Sign Up" : "Sign In"}
      </button>

      <div className=" w-full flex justify-center bg-white rounded-lg overflow-hidden">
        {tab === TabsType.SIGN_IN ? <SignIn /> : <SignUp />}

        <div className="w-full h-screen">
          <img
            src="https://images.unsplash.com/photo-1542282088-fe8426682b8f"
            alt="Car Bulb light"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
