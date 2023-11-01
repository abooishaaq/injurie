import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import StyledComponentsRegistry from "./styleCache";
import AuthedLayout from "./authedLayout";

import "./globals.css";

const inter = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Injurie",
  description: "Injurie - to help you when you get hurt",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <AuthedLayout>{children}</AuthedLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
