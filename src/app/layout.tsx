import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header  from "../components/Header"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MuCoin",
  description: "MuYu onChain Tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>

      <script
            defer={true}
            src={"/js/iconfont.js"}
          />
      </head>
      <body className={inter.className}>
        <header>
          <Header/>
        </header>
        {children}
        <footer>

        </footer>
      </body>
    </html>
  );
}
