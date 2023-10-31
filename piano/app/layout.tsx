import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import { Providers } from "./redux/provider";

export const metadata: Metadata = {
  title: "PianoRoll coding challange",
  description: "PianoRoll coding challange",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"bg-white overflow-auto"}>
        <Navigation />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
