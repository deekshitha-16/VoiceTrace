import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VoiceTrace — Say it. Ship the fix.",
  description: "The voice-first bug-to-issue workspace. Capture context and turn observations into engineering tickets.",
  icons: {
    icon: "/favicon.svg?v=voicetrace",
    shortcut: "/favicon.svg?v=voicetrace",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
