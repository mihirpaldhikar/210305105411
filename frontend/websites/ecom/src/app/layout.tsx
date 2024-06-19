import type {Metadata} from "next";
import {Montserrat} from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";

const montserrat = Montserrat({subsets: ["latin"], variable: "--font-sans"});

export const metadata: Metadata = {
    title: "ECom",
    description:
        'ECommerce',
};

interface RootLayout {
    children: ReactNode;
}

export default function RootLayout({children}: Readonly<RootLayout>) {
    return (
        <html lang="en">
        <body
            className={`min-h-screen font-sans antialiased ${montserrat.variable}`}
        >
        <div className={"flex min-h-dvh flex-col"}>
            <main className={`flex-1 "pt-20"}`}>
                {children}
            </main>
        </div>
        </body>
        </html>
    );
}