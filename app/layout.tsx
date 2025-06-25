import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from '@/app/context/SettingsContext';

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains-mono"
});

export const metadata: Metadata = {
  title: "Enhanced COD Studio with MCP - Advanced AI Reasoning",
  description: "AI Reasoning Studio with Chain of Draft methodology and Model Context Protocol integration for agentic tools",
  keywords: ["AI", "reasoning", "chain-of-draft", "MCP", "model-context-protocol", "DeepSeek", "agentic tools"],
  authors: [{ name: "Enhanced COD Studio Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-[#0f172a] text-gray-100 min-h-screen antialiased`}>
        <div className="min-h-screen bg-[#0f172a]">
          <SettingsProvider>
            {children}
          </SettingsProvider>
        </div>
      </body>
    </html>
  );
}
