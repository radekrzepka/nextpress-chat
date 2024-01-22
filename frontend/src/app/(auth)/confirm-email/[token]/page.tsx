import apiFetch from "@/utils/fetch";
import Link from "next/link";
import { notFound } from "next/navigation";

const ConfirmEmailPage = async ({
   params: { token },
}: {
   params: { token: string };
}) => {
   try {
      const message = await apiFetch<{ title: string; description: string }>(
         `/user/sign-up/validate-email/${token}`
      );
      return (
         <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6">
            <div className="space-y-6">
               <h2 className="text-center text-3xl font-extrabold text-white">
                  {message.title}
               </h2>
               <p className="text-center">{message.description}</p>
               <p className="text-center text-sm text-gray-300">
                  <Link
                     className="font-medium text-indigo-400 hover:text-indigo-500"
                     href="/sign-in"
                  >
                     Sign in
                  </Link>
               </p>
            </div>
         </div>
      );
   } catch (error) {
      return notFound();
   }
};

export default ConfirmEmailPage;
