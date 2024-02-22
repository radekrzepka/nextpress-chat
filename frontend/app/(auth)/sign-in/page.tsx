import { SignInForm } from "./_modules/sign-in-form";
import Link from "next/link";

const SignInPage = () => {
   return (
      <div className="grid w-full max-w-md space-y-6">
         <div>
            <h2 className="text-center text-3xl font-extrabold text-white">
               Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-300">
               <Link
                  className="font-medium text-indigo-400 hover:text-indigo-500"
                  href="/sign-up"
               >
                  Or create account
               </Link>
            </p>
         </div>
         <SignInForm />
      </div>
   );
};

export default SignInPage;
