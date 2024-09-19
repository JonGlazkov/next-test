"use client";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must have at least 6 characters" }),
});

type SignInSchema = z.infer<typeof signInSchema>;

export function SignInForm() {
  const router = useRouter();
  const { register, formState, handleSubmit } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  async function handleSignIn(data: SignInSchema) {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: result.error,
      });
      console.log(result);
      return;
    }

    toast({
      title: "Welcome back!",
      description: "You have successfully signed in.",
    });
    router.replace("/admin");
  }

  return (
    <>
      <div className="mb-8">
        <img
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="logo"
          className="h-8"
        />
      </div>

      <h2 className="text-2xl font-bold mb-8">Sign In to your account</h2>

      <form onSubmit={handleSubmit(handleSignIn)} className="w-3/5">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email address
          </label>
          <input
            {...register("email")}
            id="email"
            type="text"
            name="email"
            placeholder="Enter your email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="text-red-500 text-xs italic">
            {formState.errors.email?.message}
          </label>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            {...register("password")}
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="text-red-500 text-xs italic">
            {formState.errors.password?.message}
          </label>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline hover:bg-indigo-700"
        >
          Sign in
        </button>
      </form>
    </>
  );
}
