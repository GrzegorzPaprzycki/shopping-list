import "@/styles/global.css";
import { ReactNode } from "react";
import GlassPane from "@/components/GlassPane";
import Sidebar from "@/components/Sidebar";

type IProps = {
  children: ReactNode;
};

export default function DashboardRootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen rainbow-mesh">
        <GlassPane className="w-full h-full flex items-center">
          <Sidebar />
          {children}{" "}
        </GlassPane>
        <div id="modal"></div>
      </body>
    </html>
  );
}
