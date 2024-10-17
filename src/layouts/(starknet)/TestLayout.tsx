import FollowPointer from "@/components/shared/follow-pointer";
import MaxWrapper from "@/components/shared/max-wrapper";
import { Outlet } from "react-router-dom";

export default function TestLayout() {
  return (
    <div className="py-10">
      <FollowPointer />

      <MaxWrapper>
        <Outlet />
      </MaxWrapper>
    </div>
  );
}
