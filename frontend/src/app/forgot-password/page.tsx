import ResetPasswordEmailForm from "@/modules/reset-password/reset-password-email-form";
const ForgotPasswordPage = () => {
   return (
      <div className="mx-auto flex min-h-[95vh] w-full max-w-md flex-col items-center justify-center space-y-8">
         <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
               Reset password
            </h2>
            <p className="mt-6 text-center  font-extrabold text-white">
               Please provide your email
            </p>
         </div>
         <ResetPasswordEmailForm />
      </div>
   );
};

export default ForgotPasswordPage;
