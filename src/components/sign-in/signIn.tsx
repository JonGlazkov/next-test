import { signIn } from "next-auth/react";
import { SignInForm } from "./form";

export default function SignIn() {
  return (
    <div className="w-full flex flex-col items-center justify-center p-8 mx-auto">
      <SignInForm />

      <div className="my-4 flex items-center justify-between">
        <hr className="w-full border-gray-300" />
        <span className="px-2 text-gray-400 text-sm">Or continue with</span>
        <hr className="w-full border-gray-300" />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => signIn("google")}
          className="bg-white text-gray-600 font-bold py-2 px-4 w-full border rounded flex items-center justify-center hover:bg-gray-100"
        >
          <img
            className="h-5 mr-2"
            src="https://cdn2.hubspot.net/hubfs/53/image8-2.jpg"
            alt="Google logo"
          />{" "}
          Google
        </button>
        <button
          onClick={() => signIn("github")}
          className="bg-white text-gray-600 font-bold py-2 px-8 w-full border rounded flex items-center justify-center hover:bg-gray-100"
        >
          <img
            className="h-5 mr-2"
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub logo"
          />{" "}
          GitHub
        </button>
      </div>
    </div>
  );
}
