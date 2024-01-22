import Link from "next/link";
import SignUpForm from "@/modules/sign-up/sign-up-form";

const SignUpPage = () => {
   return (
      <div className="w-full max-w-md space-y-6">
         <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
               Sign up for a new account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-300">
               <Link
                  className="font-medium text-indigo-400 hover:text-indigo-500"
                  href="/sign-in"
               >
                  Or sign in to your existing account
               </Link>
            </p>
         </div>
         <SignUpForm />
      </div>
   );
};

export default SignUpPage;
