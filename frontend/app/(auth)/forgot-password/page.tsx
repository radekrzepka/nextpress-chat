import { ResetPasswordEmailForm } from "./_modules/reset-password-email-form/reset-password-email-form";

const ForgotPasswordPage = () => {
   return (
      <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6">
         <div className="space-y-6">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
               Reset your password
            </h2>
            <p className="mb-6 text-center">
               Enter your email address below to receive a password reset link.
               Click on the link in the email, and you&apos;ll be directed to a
               page where you can set a new password.
            </p>
         </div>
         <ResetPasswordEmailForm />
      </div>
   );
};

export default ForgotPasswordPage;
