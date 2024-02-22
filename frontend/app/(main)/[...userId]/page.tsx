import { Avatar, AvatarImage } from "../../_components/ui/avatar";
import { SendMessageForm } from "../_modules/messages/send-message-form";
import { cn } from "@/_utils/cn";
import { apiFetch } from "../../_utils/fetch";
import { getJWT } from "../../_utils/get-jwt";

const Page = async ({ params }: { params: { userId: string } }) => {
   const messages = await apiFetch<
      Array<{ type: "sent" | "received"; message: string; id: string }>
   >(`/user/messages/${params.userId}`, {}, getJWT());

   return (
      <>
         <div className="flex items-center justify-between pb-4">
            <h2 className="text-2xl font-semibold">
               Chat with {params.userId}
            </h2>
         </div>
         <div className="flex-1 space-y-6 overflow-auto pt-6">
            {messages.map(({ id, message, type }) => (
               <div
                  key={id}
                  className={`${cn(
                     "flex items-end space-x-2",
                     type === "sent" && "justify-end"
                  )}`}
               >
                  <Avatar>
                     <AvatarImage
                        alt="User 1"
                        src="/placeholder.svg?height=40&width=40"
                     />
                  </Avatar>
                  <div
                     className={`${cn(
                        "rounded-lg bg-blue-600 p-3",
                        type === "sent" && "bg-gray-800"
                     )}`}
                  >
                     <p className="text-sm">{message}</p>
                  </div>
               </div>
            ))}
         </div>
         <SendMessageForm />
      </>
   );
};

export default Page;
