"use client"
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle, Edit2, Loader2, Inbox, Plus, LucideMessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
  isPro: boolean;
};

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
  const [loading, setLoading] = useState(false);
  const [editChatId, setEditChatId] = useState<number | null>(null);
  const [editedPdfName, setEditedPdfName] = useState<string>("");

  const [clickedUrl, setClickedUrl] = useState("");
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);


   const handleEditlemeMenu = (chatId:any) =>{
   



    setEditChatId(chatId);
    setDuzenleme(true);
   }

   useEffect(() => {
    if (editChatId !== null) {
      const inputElement = document.getElementById("degisim");
      if (inputElement) {
        inputElement.focus(); // input alanına odaklan
      }
    }
  }, [editChatId]);

  const handleLinkClick = (url:any) => {
    setClickedUrl(url);
    setClicked(true);
  };

  useEffect(() => {
    if (clicked && duzenleme==false) {
      window.location.href = clickedUrl;
      setClicked(false); // Clicked state'ini sıfırla
    }
  }, [clicked, clickedUrl]);


  const [duzenleme, setDuzenleme] = useState(false);

 

  const handleEditChatName = async (chatId: number) => {
    try {
      setLoading(true); // Enable loading state
      const response = await axios.put(`/api/update-chat`, { chat_id: chatId, pdfName: editedPdfName });
      if (response.data.success) {
        toast.success("Chat name updated successfully");
        setEditedPdfName(editedPdfName); 
        setDuzenleme(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error editing chat name: ", error);
      toast.error("Failed to update chat name");
    } finally {
      setLoading(false); // Disable loading state
      setEditChatId(null); // Edit mode off
    }
  };
  

  const [uploading, setUploading] = useState(false);
  const { mutate, isLoading } = useMutation({
    mutationFn: async ({ file_key, file_name }: { file_key: string; file_name: string; }) => {
      const response = await axios.post("/api/create-chat", {
        file_key,
        file_name,
      });
      return response.data;
    },
  });
  

  const handleStartChat = async () => {
    try {
      // Burada dosya yükleme işlemi olmadan dosyanın alınması gerekiyor
      // Dosya yükleme işlevselliği olmadığı için bu kısmı doldurmanız gerekmektedir
      // Eğer dosya yükleme işlevselliğini kullanmayacaksanız bu kısmı düzenlemeniz gerekmektedir
      const data = { file_key: "example_file_key", file_name: "example_file_name" };
  
      if (!data.file_key || !data.file_name) {
        toast.error("Something went wrong");
        return;
      }
  
      setUploading(true);
      mutate(data, {
        onSuccess: ({ chat_id }) => {
          toast.success("Chat created!");
          

          router.push(`/chat/${chat_id}`);
          
        },
        onError: (err) => {
          toast.error("Error creating chat " + err);
          console.error(err);
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };
  
 

  // Chats dizisini ters sırala
  const reversedChats = [...chats].reverse();

  return (
    <div className="w-full max-h-screen overflow-scroll soff p-4 text-gray-200 bg-gray-900">
     
     <div
        onClick={handleStartChat}
        className="border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-2 flex justify-center items-center flex-col"
      >
        {uploading || isLoading ? (
          <>
            {/* loading state */}
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400">Başlatılıyor...</p>
          </>
        ) : (
          <>
            <LucideMessageCircle className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-600">Yeni Bir Sohbet Başlat</p>
          </>
        )}
      </div>
      

      <div className="flex max-h-screen pb-20 flex-col gap-2 mt-4">
        {reversedChats.map((chat) => (
          <div key={chat.id} className="relative">
            {editChatId === chat.id ? (
              <div className="absolute top-0 right-0 p-0.5 rounded-full">
                <Button onClick={() => handleEditChatName(chat.id)} disabled={loading}>
                  Kaydet
                </Button>
              </div>
            ) : (
              <div className="absolute top-0 right-0 p-0.5 rounded-full">
                <Button onClick={() => {
                 handleEditlemeMenu(chat.id)

                 }}>
                  <Edit2 className="w-4 h-4" />
                </Button>
              </div>
            )}
            <Link href={`/chat/${chat.id}`}   onClick={() => handleLinkClick(`/chat/${chat.id}`)}
>
              <div

                className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                  "bg-blue-600 text-white": chat.id === chatId,
                  "hover:text-white": chat.id !== chatId,
                })}
              >
                {editChatId === chat.id ? (
                  loading ? (
                    <div className="flex items-center">
                      <div className="mr-2 animate-spin">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM0 10a10 10 0 1120 0 10 10 0 01-20 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p>Yükleniyor...</p>
                    </div>
                  ) : (
                    <input
                      ref={inputRef}
                      id="degisim"
                      type="text"
                      className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis bg-transparent outline-none"
                      value={editedPdfName || " " ||  chat.pdfName} // Eğer editedPdfName varsa onu, yoksa chat.pdfName'i kullan
                      onChange={(e) => setEditedPdfName(e.target.value)}
                    />
                  )
                ) : (
                  <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                    {chat.pdfName}
                  </p>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSideBar;
