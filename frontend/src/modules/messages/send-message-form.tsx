import { Button } from "@/components/ui/button";

interface SendMessageFormProps {}

const SendMessageForm = ({}: SendMessageFormProps) => {
   return (
      <div className="flex space-x-3 pt-6">
         <input
            className="flex-1 rounded-lg bg-white p-3 text-black"
            placeholder="Write a message..."
            type="text"
         />
         <Button className="w-20 rounded-lg bg-blue-600 py-6 text-white transition-colors duration-200 hover:bg-blue-500">
            Send
         </Button>
      </div>
   );
};

export default SendMessageForm;
