"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import {
   ResetPasswordEmailForm,
   resetPasswordEmailFormSchema,
} from "./reset-password-email-form-schema";
import type { ApiError } from "@/types/api-error";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import apiFetch from "@/utils/fetch";
import { ReloadIcon } from "@radix-ui/react-icons";

const ResetPasswordEmailForm = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<ResetPasswordEmailForm>({
      resolver: zodResolver(resetPasswordEmailFormSchema),
   });

   const { mutate: signUpMutation, isPending } = useMutation<
      string,
      ApiError,
      ResetPasswordEmailForm
   >({
      mutationFn: async ({ email }: ResetPasswordEmailForm) => {
         return apiFetch<string>("/user/forgot-password", {
            body: JSON.stringify({ email }),
            method: "POST",
         });
      },
      onSuccess: () => {
         toast.success("Password has been reset, check your email");
      },
      onError: error => {
         toast.error(error.message);
      },
   });

   const onSubmit: SubmitHandler<ResetPasswordEmailForm> = data => {
      signUpMutation(data);
   };

   return (
      <div className="mx-auto my-10 max-w-lg rounded-lg text-white shadow-lg">
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="-space-y-px rounded-md shadow-sm">
               <div>
                  <Label className="sr-only" htmlFor="email">
                     Enter your e-mail
                  </Label>
                  <Input
                     className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                     id="email"
                     placeholder="Enter your e-mail"
                     required
                     type="email"
                     {...register("email")}
                  />
               </div>
            </div>

            <div>
               <Button
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  type="submit"
                  disabled={isPending}
               >
                  {isPending && (
                     <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Reset password
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
      </div>
   );
};

export default ResetPasswordEmailForm;
