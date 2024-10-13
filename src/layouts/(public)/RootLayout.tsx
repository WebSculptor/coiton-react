import { Outlet } from "react-router-dom";
import Header from "./_components/header";
import Footer from "./_components/footer";
import FollowPointer from "@/components/shared/follow-pointer";

export default function RootLayout() {
  return (
    <div className="flex flex-col">
      <div className="absolute left-0 top-0 -z-10 min-h-screen w-full bg-gradient-to-b from-[#FFF4DE] via-[#FFF4DE]/50 to-background" />
      <FollowPointer />

      <Header />
      <main className="flex-1 py-16 sm:py-24 md:py-36">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
