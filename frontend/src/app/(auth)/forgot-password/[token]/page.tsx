import ResetPasswordForm from "@/modules/reset-password-form/reset-password-form";
import apiFetch from "@/utils/fetch";
import { notFound } from "next/navigation";

const ForgotPasswordPage = async ({
   params: { token },
}: {
   params: { token: string };
}) => {
   try {
      await apiFetch(`/user/forgot-password/validate/${token}`);
   } catch {
      return notFound();
   }

   return (
      <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6">
         <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
               Reset your password
            </h2>
         </div>
         <ResetPasswordForm token={token} />
      </div>
   );
};

export default ForgotPasswordPage;
