import { SignUpForm } from "./form";

export default function SignUp() {
  return (
    <div className="w-full flex flex-col items-center justify-center p-8 mx-auto">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <div className="mb-6 text-center">
          <img
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="logo"
            className="h-8 mx-auto"
          />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">
          Create your account
        </h2>

        <SignUpForm />

        <div className="my-4 text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/" className="text-indigo-600 font-medium">
              Sign in
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
