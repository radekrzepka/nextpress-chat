import ResetPasswordForm from "@/modules/reset-password/reset-password-form";

const ForgotPasswordPage = ({
   params: { token },
}: {
   params: { token: string };
}) => {
   return (
      <div className="mx-auto flex min-h-[95vh] w-full max-w-md flex-col items-center justify-center space-y-8">
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
