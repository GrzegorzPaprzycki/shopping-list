import "@/styles/global.css";
import { ReactNode } from "react";
import GlassPane from "@/components/GlassPane";

type IProps = {
  children: ReactNode;
};

export default function AuthRootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <head>
        <title>Shopping List App</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="../favicon.ico" />{" "}
      </head>
      <body className="h-screen w-screen rainbow-mesh p-6">
        <GlassPane className="w-full h-full flex items-center justify-center">
          {children}{" "}
        </GlassPane>
      </body>
    </html>
  );
}
