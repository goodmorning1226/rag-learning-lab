import type { Metadata } from "next";
import "./globals.css";
import { ProgressProvider } from "@/hooks/useProgress";

export const metadata: Metadata = {
  title: "RAG 一週速成互動課程",
  description:
    "用白話觀念、Python 範例與實作練習，快速掌握 RAG 核心能力。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('rag-lab:theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}",
          }}
        />
      </head>
      <body>
        <ProgressProvider>{children}</ProgressProvider>
      </body>
    </html>
  );
}
