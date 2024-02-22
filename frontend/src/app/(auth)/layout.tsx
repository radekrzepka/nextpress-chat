import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="flex min-h-screen flex-col items-center justify-between">
         <div className="mx-auto mt-6 flex w-full justify-center">
            {children}
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
