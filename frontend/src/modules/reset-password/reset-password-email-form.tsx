import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ResetPasswordEmailForm = () => {
   return (
      <form action="#" className="mt-8 space-y-6" method="POST">
         <div className="-space-y-px rounded-md shadow-sm">
            <div>
               <Label className="sr-only" htmlFor="email-address">
                  New password
               </Label>
               <Input
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  id="new-password"
                  name="newPassword"
                  placeholder="New password"
                  required
                  type="password"
               />
            </div>
            <div>
               <Label className="sr-only" htmlFor="password">
                  Confirm new password
               </Label>
               <Input
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  id="password"
                  name="password"
                  placeholder="Confirm new password"
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
               Reset password
            </Button>
         </div>
      </form>
   );
};

export default ResetPasswordEmailForm;
