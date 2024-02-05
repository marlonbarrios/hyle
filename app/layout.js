import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";

export const metdata = {
  title: "Llama Chat",
  openGraph: {
    title: "Llama Chat",
    description: "Chat with HYLE, inspired by figures like Donna Haraway, Timothy Morton, and Michael Maerder, is a speculative and versatile storyteller..",
  },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>HYLE</title>
        {/* <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦙</text></svg>"
        /> */}
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
