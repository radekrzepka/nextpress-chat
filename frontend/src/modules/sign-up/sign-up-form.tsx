"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { SignUpForm, signUpFormSchema } from "./sign-up-form-schema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getCookie } from "cookies-next";

const SignUpForm = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<SignUpForm>({
      resolver: zodResolver(signUpFormSchema),
   });

   const { mutate: signUpMutation } = useMutation({
      mutationFn: async ({ email, password, username }: SignUpForm) => {
         return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/sign-up`, {
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               email,
               username,
               password,
            }),
            method: "POST",
         });
      },
      onSuccess: () => {
         toast.success("Success");
         const test = getCookie("JWT");
         console.log(test);
      },
      onError: () => {
         toast.error("Error");
      },
   });

   const onSubmit: SubmitHandler<SignUpForm> = data => {
      signUpMutation(data);
   };

   return (
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
         <div className="-space-y-px rounded-md shadow-sm">
            <div>
               <Label className="sr-only" htmlFor="email-address">
                  Email address
               </Label>
               <Input
                  autoComplete="email"
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  id="email-address"
                  placeholder="Email address"
                  required
                  type="email"
                  {...register("email")}
               />
            </div>
            <div>
               <Label className="sr-only" htmlFor="username">
                  Username
               </Label>
               <Input
                  autoComplete="username"
                  className="relative block w-full appearance-none rounded-none border border-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  id="username"
                  placeholder="Username"
                  required
                  type="text"
                  {...register("username")}
               />
            </div>
            <div>
               <Label className="sr-only" htmlFor="password">
                  Password
               </Label>
               <Input
                  autoComplete="new-password"
                  className="relative block w-full appearance-none rounded-none border border-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  id="password"
                  placeholder="Password"
                  required
                  type="password"
                  {...register("password")}
               />
            </div>
            <div>
               <Label className="sr-only" htmlFor="repeat-password">
                  Repeat password
               </Label>
               <Input
                  autoComplete="new-password"
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  id="repeat-password"
                  placeholder="Repeat password"
                  required
                  type="password"
                  {...register("repeatPassword")}
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
         <div>
            {Object.values(errors).map(error => (
               <p className="text-sm text-red-500" key={error.message}>
                  {error.message}
               </p>
            ))}
         </div>
      </form>
   );
};

export default SignUpForm;
