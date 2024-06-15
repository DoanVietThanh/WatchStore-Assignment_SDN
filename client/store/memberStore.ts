import { create } from "zustand";

import { MemberType } from "@/types/member.types";

type MemberStoreProps = {
  member: MemberType | null;
  setMember: (member: MemberType) => void;
};

export const useMemberStore = create<MemberStoreProps>((set) => ({
  member: null,
  setMember: (member: MemberType) =>
    set((state) => ({
      ...state,
      member: member,
    })),
}));
