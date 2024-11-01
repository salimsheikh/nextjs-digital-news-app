//import Icons
import 'bootstrap-icons/font/bootstrap-icons.css'

//import bootstrap
import 'bootstrap/dist/css/bootstrap.css';

//import aos css
import 'aos/dist/aos.css';

import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import Header from '@/components/Header';
import "./variables.css";
import "./globals.css";


const ebGramond = EB_Garamond({ subsets: ['latin']});

export const metadata: Metadata = {
  title: "Digital News",
  description: "Log on for latest news.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ebGramond.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
