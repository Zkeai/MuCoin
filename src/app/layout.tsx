import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header  from "../components/Header"
import Footer  from "../components/Footer"
import getJsonData from '../utils/file.ts';


import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from '../context/providers';

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
  const data = getJsonData();

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
        <Providers>
          <Header menuData={data} />
        </Providers>
        </header>
        {children}
        <footer>
        <Footer />
        </footer>
      </body>
    </html>
  );
}
