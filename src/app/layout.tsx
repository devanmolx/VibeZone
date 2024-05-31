import { Inter } from "next/font/google";
import "./globals.css";
import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";
import TopBar from "@/components/TopBar";
import { Provider } from "@/lib/Provider";
import UserContextProvider from "./context/UserContextProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="no-scrollbar">
      <body className={`${inter.className}`}>
        <Provider>
          <UserContextProvider>
            <main className=" w-screen min-h-screen bg-[#1F1826] flex justify-between">
              <LeftSideBar />
              <div className=" w-full min-h-screen flex flex-col items-center p-3 md:p-8">
                <TopBar />
                {children}
              </div>
              <RightSideBar />
            </main>
          </UserContextProvider>
        </Provider>
      </body>
    </html >
  );
}
