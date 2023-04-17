import "@/styles/global.css";
import { ReactNode } from "react";
import GlassPane from "@/components/GlassPane";

type IProps = {
  children: ReactNode;
};

export default function AuthRootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen bg-gray-100">
        <GlassPane className="w-full h-full flex items-center justify-center">
          {children}{" "}
        </GlassPane>
      </body>
    </html>
  );
}
