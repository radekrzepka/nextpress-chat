import { apiFetch } from "../../_utils/fetch";
import { getJWT } from "../../_utils/get-jwt";
import { SendMessagePage } from "../_modules/messages/send-message-page";

const Page = async ({ params }: { params: { userId: string } }) => {
   const messages = await apiFetch<
      Array<{ type: "sent" | "received"; message: string; id: string }>
   >(`/user/messages/${params.userId}`, {}, getJWT());

   return <SendMessagePage messages={messages} />;
};

export default Page;
