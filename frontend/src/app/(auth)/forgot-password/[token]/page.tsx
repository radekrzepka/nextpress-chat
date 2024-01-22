import ResetPasswordForm from "@/modules/reset-password-form/reset-password-form";

const ForgotPasswordPage = ({
   params: { token },
}: {
   params: { token: string };
}) => {
   return (
      <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6">
         <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
               Reset your password
            </h2>
         </div>
         <ResetPasswordForm />
      </div>
   );
};

export default ForgotPasswordPage;
