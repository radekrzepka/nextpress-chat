"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { ResetPasswordForm } from "./reset-password-form-schema";
import { resetPasswordFormSchema } from "./reset-password-form-schema";
import type { ApiError } from "@/types/api-error";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import apiFetch from "@/utils/fetch";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

interface ResetPasswordFormProps {
   token: string;
}

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<ResetPasswordForm>({
      resolver: zodResolver(resetPasswordFormSchema),
   });

   const router = useRouter();

   const { mutate: signUpMutation, isPending } = useMutation<
      string,
      ApiError,
      ResetPasswordForm
   >({
      mutationFn: async ({ password }: ResetPasswordForm) => {
         return apiFetch<string>(`/user/forgot-password/update/${token}`, {
            body: JSON.stringify({ newPassword: password }),
            method: "PATCH",
         });
      },
      onSuccess: () => {
         toast.success("Password changed, you can now log in");
         router.push("/sign-in");
      },
      onError: error => {
         toast.error(error.message);
      },
   });

   const onSubmit: SubmitHandler<ResetPasswordForm> = data => {
      signUpMutation(data);
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
         <div className="-space-y-px rounded-md shadow-sm">
            <div>
               <Label className="sr-only" htmlFor="password">
                  New password
               </Label>
               <Input
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  id="password"
                  placeholder="New password"
                  required
                  type="password"
                  {...register("password")}
               />
            </div>
            <div>
               <Label className="sr-only" htmlFor="repeat-password">
                  Confirm new password
               </Label>
               <Input
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  id="repeat-password"
                  placeholder="Confirm new password"
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
   );
};

export default ResetPasswordForm;
