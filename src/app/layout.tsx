import "./global.css";
import LoadingContextProvider from "@/context/LoadingContext/LoadingContextProvider";
import UserContextProvider from "@/context/UserContext/UserContextProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="no-scrollbar">
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
