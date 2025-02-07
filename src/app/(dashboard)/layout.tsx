import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";
import TopBar from "@/components/TopBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main className=" w-screen min-h-screen bg-[#1F1826] flex justify-between">
      <LeftSideBar />
      <div className=" w-full min-h-screen flex flex-col items-center p-3 md:p-8">
        <TopBar />
        {children}
      </div>
      <RightSideBar />
    </main>
  );
}
