'use client';
import { useMutation } from "@tanstack/react-query";
import { Inbox, Loader2, LucideMessageCircle } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const FileUpload = () => {
  const router = useRouter();
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

  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        onClick={handleStartChat}
        className="border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col"
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
    </div>
  );
};

export default FileUpload;
