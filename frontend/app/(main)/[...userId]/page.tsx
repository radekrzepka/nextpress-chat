import { notFound } from "next/navigation";
import { apiFetch } from "../../_utils/fetch";
import { getJWT } from "../../_utils/get-jwt";
import { SendMessagePage } from "../_modules/messages/send-message-page";
import type { Message } from "../_schemas/message.schema";
import { getUserDataById } from "../_api/get-user-data";

const Page = async ({ params }: { params: { userId: string } }) => {
   try {
      const messages = await apiFetch<Array<Message>>(
         `/user/messages/${params.userId}`,
         {},
         getJWT()
      );

      const userData = await getUserDataById(params.userId);

      return <SendMessagePage initialMessages={messages} userData={userData} />;
   } catch {
      return notFound();
   }
};

export default Page;
