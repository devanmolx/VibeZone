import "./global.css";
import LoadingContextProvider from "@/context/LoadingContext/LoadingContextProvider";
import UserContextProvider from "@/context/UserContext/UserContextProvider";

export const metadata = {
  title: "VibeZone",
  description: "Share your vibe with the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="no-scrollbar scroll-smooth">
      <body>
        <LoadingContextProvider>
          <UserContextProvider>
            {children}
          </UserContextProvider>
        </LoadingContextProvider>
      </body>
    </html >
  );
}
