import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="flex min-h-screen flex-col justify-between">
         <div>
            <header className="flex w-full flex-col items-center pt-6 text-center">
               <h1 className="text-4xl font-bold text-white">
                  Nextpress chat app
               </h1>
               <p className="mx-auto mt-2 text-lg text-gray-300 lg:w-1/2">
                  Your go-to live chat app where you can effortlessly chat with
                  friends and create groups for endless conversations. Connect,
                  share, and stay close - all in real-time. Let&apos;s start
                  chatting!
               </p>
               <Image src={"/logo.png"} alt="Logo" width={200} height={200} />
            </header>
            <div className="mx-auto flex w-full justify-center">{children}</div>
         </div>

         <footer className="w-full pb-6 text-center">
            <p className="text-sm text-gray-300">
               <a href="https://github.com/radekrzepka">
                  Made by @Radosław Rzepka
               </a>
            </p>
         </footer>
      </div>
   );
};

export default Layout;
