import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DRIOL // PULSE — Enterprise Telemetry Matrix",
  description: "Next-generation real-time IoT hardware telemetry & predictive analytics engine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-brand-cyan/30 selection:text-brand-cyan">
        {children}
      </body>
    </html>
  );
}
