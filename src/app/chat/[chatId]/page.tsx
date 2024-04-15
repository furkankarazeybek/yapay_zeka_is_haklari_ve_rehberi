import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { checkSubscription } from "@/lib/subscription";
import { UserButton, auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect("/");
  }
  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  const isPro = await checkSubscription();


  return (
    <div className="flex max-h-screen overflow-scroll d-flex h-[1000px]">
      <div className="flex w-full max-h-screen overflow-scroll">
        {/* chat sidebar */}
        <div className="max-w-xs hidden  md:flex-[10]  md:flex">
        
          <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} />
        </div>
        {/* pdf viewer */}
        <div className="max-h-screen  overflow-scroll flex-[5] hidden md:flex">
        
      
        <div className="w-screen  h-[1200px] sm:h-[1200px] lg:h-[950px]  bg-gradient-to-r from-rose-100 to-teal-100 flex pt-10">

       < div className="absolute sm:left-1/2 sm:-translate-x-1/2   " style={{ display: 'contents' }}>
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
          <h1 className=" text-2xl sm:text-2xl font-semibold p-2">İş Hayatında Bilge Adımlar: Yapay Zeka Tabanlı İş Hakları ve Güvenliği Rehberi</h1>

          </div>

          <div className="flex mt-2">
            
          </div>
        
        <div style={{ textAlign: 'center', padding: "12px", fontSize: "14px" }}>
          <p>
            <strong>İş Hakları ve Güvenliği Rehberi:</strong> Türkiye Cumhuriyeti Devleti sınırları içerisinde faaliyet gösteren tüm işçiler, işverenler ve diğer iş dünyası paydaşları için tasarlanmış, yapay zeka modeline Türkiye Cumhuriyeti Devleti sınırları içerisindeki işçiler, işverenler ve diğer iş dünyası paydaşlarının sahip olduğu hakların öğretildiği, yapay zeka tabanlı bir rehberlik sistemidir.
          </p>
          <br /><br />
          <p>
          <strong>-</strong> İşçilerin, işverenlerin, iş dünyasındaki diğer sınıfların ve grupların çeşitli iş yerleriyle karşılaştığı sorunlarla ilgili çözüm bulmak için tasarlanmıştır. İşçilerin iş haklarını korumak, işverenlerin ise iş güvenliği ve yasal düzenlemelere uyumu sağlamak gibi konularda bilgi ve yönlendirme sağlar. Sendikal haklar, tersine beyin göçü, işveren ve işçi hakkı, ayrımcılık, mobbing, iş sağlığı güvenliği gibi konularda mevcut haklar doğrultusunda rehberlik desteği sunar. İş yaşamıyla ile ilgili konularda öğrenilmek istenen konuya veya çözülmek istenen soruna göre, aşamalı olarak hangi yolların izleneceğine dair detaylı bir şekilde açıklama yapar.
          </p>
          <br /><br />
          <ul>
            <li><strong>-</strong> İşçi ve işverenlerin yanı sıra diğer iş dünyası paydaşlarının iş dünyasındaki çeşitli sorunlara çözüm bulmalarına yardımcı olmak için geniş bir bilgi tabanına ve yapay zeka algoritmalarına dayanır.</li>
            <li><strong>-</strong> İşçilerin, işverenlerin ve diğer iş dünyası paydaşlarının sorunlarını anlamak ve çözümler sunmak için güvenilir, tarafsız ve kapsamlı bir kaynak sağlar.</li>
          </ul>
        </div>

          <div className="w-full mt-4">
           
          </div>

          <p className="pt-10">2024 © Furkan KARAZEYBEK</p>

        </div>

      </div>
        
        </div>
        </div>
        {/* chat component */}
        <div className="flex-[3] border-l-4 border-l-slate-200">
          <ChatComponent chatId={parseInt(chatId)} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
