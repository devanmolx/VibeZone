import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";
import TopBar from "@/components/TopBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main className=" w-screen min-h-screen bg-[#18141F] bg-[radial-gradient(ellipse_at_top,rgba(124,85,231,0.12),transparent_55%)] flex justify-between">
      <LeftSideBar />
      <div className=" w-full min-h-screen flex flex-col items-center p-3 md:p-8">
        <TopBar />
        {children}
      </div>
      <RightSideBar />
    </main>
  );
}
