import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/SubscriptionButton";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  // const isPro = await checkSubscription();
  let firstChat;
   if (userId) {
     const userChats = await db.select().from(chats).where(eq(chats.userId, userId));
     if (userChats) {
      firstChat = userChats.reverse()[0];
     }
   }

  return (
<div className="w-screen h-[1200px] sm:h-[1200px] lg:h-[800px] bg-gradient-to-r from-rose-100 to-teal-100 flex pt-10">

   <div className="absolute sm:left-1/2 sm:-translate-x-1/2   ">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center px-2">
          <h1 className="px-1 text-2xl sm:text-5xl font-semibold">İş Hayatında Bilge Adımlar: Yapay Zeka Tabanlı İş Hakları ve Güvenliği Rehberi</h1>

            <UserButton afterSignOutUrl="/" />
          </div>

          <div className="flex mt-2">
            {isAuth && firstChat && (
              
            <>
             <div className="hidden md:block pt-10">
                <Link href={`/chat/${firstChat.id}`}>
                  <Button>
                    Konuşma Geçmişi <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </div>


              <div className="md:hidden pt-10">
                 <Link href={`/mobile-chat/${firstChat.id}`}>
                   <Button>
                     Konuşma Geçmişi <ArrowRight className="ml-2" />
                   </Button>
                 </Link>
               </div>



            </>
           

           
           
            )}
          </div>
{!isAuth ? (
<div style={{ textAlign: 'left', padding: "10px" }}>
  <p>
    <strong>İş Hakları ve Güvenliği Rehberi:</strong> Türkiye Cumhuriyeti Devleti sınırları içerisinde faaliyet gösteren tüm işçiler, işverenler ve diğer iş dünyası paydaşları için tasarlanmış, yapay zeka modeline Türkiye Cumhuriyeti Devleti sınırları içerisindeki işçiler, işverenler ve diğer iş dünyası paydaşlarının sahip olduğu hakların öğretildiği, yapay zeka tabanlı bir rehberlik sistemidir.
  </p>
  <p>
  <strong>-</strong> İşçilerin, işverenlerin, iş dünyasındaki diğer sınıfların ve grupların çeşitli iş yerleriyle karşılaştığı sorunlarla ilgili çözüm bulmak için tasarlanmıştır. İşçilerin iş haklarını korumak, işverenlerin ise iş güvenliği ve yasal düzenlemelere uyumu sağlamak gibi konularda bilgi ve yönlendirme sağlar. Sendikal haklar, tersine beyin göçü, işçi hakkı, ayrımcılık, mobbing gibi konularda mevcut haklar doğrultusunda rehberlik desteği sunar. İş yaşamıyla ile ilgili konularda öğrenilmek istenen konuya veya çözülmek istenen soruna göre, aşamalı olarak hangi yolların izleneceğine dair detaylı bir şekilde açıklama yapar.
  </p>
  <ul>
    <li><strong>-</strong> İşçi ve işverenlerin yanı sıra diğer iş dünyası paydaşlarının iş dünyasındaki çeşitli sorunlara çözüm bulmalarına yardımcı olmak için geniş bir bilgi tabanına ve yapay zeka algoritmalarına dayanır.</li>
    <li><strong>-</strong> İşçilerin, işverenlerin ve diğer iş dünyası paydaşlarının sorunlarını anlamak ve çözümler sunmak için güvenilir, tarafsız ve kapsamlı bir kaynak sağlar.</li>
  </ul>
</div>) : (<></>)}

          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button>
                   Giriş Yap
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>

          <p className="pt-10">2024 © Furkan KARAZEYBEK</p>

        </div>

      </div>
      
    </div>
  );
}
