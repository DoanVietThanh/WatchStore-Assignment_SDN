import mongoose from "mongoose";

export const memberSchema = new mongoose.Schema({
  // account name
  memberName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  yob: {
    type: Number,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export const MemberModel = mongoose.model("Member", memberSchema);
