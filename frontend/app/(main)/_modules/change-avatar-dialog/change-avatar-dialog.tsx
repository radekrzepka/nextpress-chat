"use client";

import { Avatar, AvatarImage } from "@/_components/ui/avatar";
import { Button } from "@/_components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/_components/ui/dialog";
import { cn } from "@/_utils/cn";
import { apiFetch } from "@/_utils/fetch";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ChangeAvatarDialogProps {
   username: string;
   avatar: number | null;
}

export const ChangeAvatarDialog = ({
   username,
   avatar,
}: ChangeAvatarDialogProps) => {
   const [open, setOpen] = useState(false);
   const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
   const avatarNumbers = Array.from({ length: 19 }, (_, index) => index + 1);
   const router = useRouter();

   const { mutate } = useMutation({
      mutationFn: (avatarId: number) =>
         apiFetch(`/user/update-avatar/${avatarId}`, { method: "PATCH" }),
      onSuccess: () => {
         toast.success("Avatar has been changed");
         router.refresh();
         setOpen(false);
      },
   });

   return (
      <>
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Change your avatar</DialogTitle>
               </DialogHeader>
               <div className="grid grid-cols-5 place-items-center gap-4 py-4">
                  {avatarNumbers.map(number => (
                     <button
                        onClick={() => setSelectedAvatar(number)}
                        key={number}
                        className="cursor-pointer"
                     >
                        <Avatar
                           className={cn(
                              number === selectedAvatar &&
                                 "ring-2 ring-slate-50 ring-offset-2"
                           )}
                        >
                           <AvatarImage
                              alt={`Avatar ${number}`}
                              src={`/avatars/Avatar${number}.svg`}
                           />
                        </Avatar>
                     </button>
                  ))}
               </div>
               <DialogFooter>
                  <Button
                     onClick={() => {
                        if (selectedAvatar) mutate(selectedAvatar);
                     }}
                  >
                     Save changes
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
         <button
            onClick={() => setOpen(true)}
            className="my-6 flex items-center space-x-3"
         >
            <Avatar>
               <AvatarImage
                  alt={`Avatar of ${username}`}
                  src={
                     avatar
                        ? `/avatars/Avatar${avatar}.svg`
                        : "/placeholder.svg?height=40&width=40"
                  }
               />
            </Avatar>
            <div className="text-xl font-medium">Welcome, {username}</div>
         </button>
      </>
   );
};
