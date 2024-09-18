"use client";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signUpSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

type SignUpSchema = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const router = useRouter();
  const { register, formState, handleSubmit } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  async function handleSignUp({ email, name, password }: SignUpSchema) {
    const response = await fetch("http://localhost:3333/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        password,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: data.message,
      });

      return;
    }

    if (response.ok) {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        console.log(result);
        return;
      }

      toast({
        title: "Congratulations!",
        description: "You have successfully signed up.",
      });
      router.replace("/admin");
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignUp)} className="w-full">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Full Name
        </label>
        <input
          {...register("name")}
          id="name"
          name="name"
          type="text"
          placeholder="Enter your full name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label className="text-red-500 text-xs italic">
          {formState.errors.name?.message}
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email address
        </label>
        <input
          {...register("email")}
          id="email"
          name="email"
          type="text"
          placeholder="Enter your email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label className="text-red-500 text-xs italic">
          {formState.errors.email?.message}
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          {...register("password")}
          id="password"
          name="password"
          type="password"
          placeholder="Create a password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label className="text-red-500 text-xs italic">
          {formState.errors.password?.message}
        </label>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Confirm Password
        </label>
        <input
          {...register("confirmPassword")}
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label className="text-red-500 text-xs italic">
          {formState.errors.confirmPassword?.message}
        </label>
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline hover:bg-indigo-700"
      >
        Sign Up
      </button>
    </form>
  );
}
