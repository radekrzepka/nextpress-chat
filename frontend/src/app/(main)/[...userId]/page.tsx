import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Page = ({ params }: { params: { userId: string } }) => {
   return (
      <>
         <div className="flex items-center justify-between pb-4">
            <h2 className="text-2xl font-semibold">
               Chat with {params.userId}
            </h2>
         </div>
         <div className="flex-1 space-y-6 overflow-auto pt-6">
            <div className="flex items-end space-x-2">
               <Avatar>
                  <AvatarImage
                     alt="User 1"
                     src="/placeholder.svg?height=40&width=40"
                  />
               </Avatar>
               <div className="rounded-lg bg-gray-800 p-3">
                  <p className="text-sm">Hello, how are you?</p>
               </div>
            </div>
            <div className="flex items-end justify-end space-x-2">
               <div className="rounded-lg bg-blue-600 p-3">
                  <p className="text-sm">I&apos;m doing well, thank you!</p>
               </div>
               <Avatar>
                  <AvatarImage
                     alt="User 2"
                     src="/placeholder.svg?height=40&width=40"
                  />
               </Avatar>
            </div>
         </div>
         <div className="flex space-x-3 pt-6">
            <input
               className="flex-1 rounded-lg bg-white p-3 text-black"
               placeholder="Write a message..."
               type="text"
            />
            <Button className="w-20 bg-blue-600 py-6 text-white transition-colors duration-200 hover:bg-blue-500">
               Send
            </Button>
         </div>
      </>
   );
};

export default Page;
