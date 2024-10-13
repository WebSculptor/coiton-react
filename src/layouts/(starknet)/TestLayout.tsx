import FollowPointer from "@/components/shared/follow-pointer";
import MaxWrapper from "@/components/shared/max-wrapper";
import { Outlet } from "react-router-dom";
import Header from "./_components/header";

export default function TestLayout() {
  return (
    <div>
      <FollowPointer />
      <Header />

      <MaxWrapper className="pb-6">
        <Outlet />
      </MaxWrapper>
    </div>
  );
}
