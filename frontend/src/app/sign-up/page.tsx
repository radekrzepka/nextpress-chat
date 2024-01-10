import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Link from "next/link";

export default function SignUp() {
   return (
      <div className="w-full max-w-md space-y-8">
         <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
               Sign up for a new account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-300">
               <Link
                  className="font-medium text-indigo-400 hover:text-indigo-500"
                  href="/"
               >
                  Or sign in to your existing account
               </Link>
            </p>
         </div>
         <form action="#" className="mt-8 space-y-6" method="POST">
            <div className="-space-y-px rounded-md shadow-sm">
               <div>
                  <Label className="sr-only" htmlFor="username">
                     Username
                  </Label>
                  <Input
                     autoComplete="username"
                     className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                     id="username"
                     name="username"
                     placeholder="Username"
                     required
                     type="text"
                  />
               </div>
               <div>
                  <Label className="sr-only" htmlFor="email-address">
                     Email address
                  </Label>
                  <Input
                     autoComplete="email"
                     className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                     id="email-address"
                     name="email"
                     placeholder="Email address"
                     required
                     type="email"
                  />
               </div>
               <div>
                  <Label className="sr-only" htmlFor="password">
                     Password
                  </Label>
                  <Input
                     autoComplete="new-password"
                     className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                     id="password"
                     name="password"
                     placeholder="Password"
                     required
                     type="password"
                  />
               </div>
            </div>
            <div>
               <Button
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  type="submit"
               >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                     <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           clipRule="evenodd"
                           d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                           fillRule="evenodd"
                        />
                     </svg>
                  </span>
                  Sign up
               </Button>
            </div>
         </form>
      </div>
   );
}
