import Group from "../models/group.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const createGroup = async (req, res) => {
  const { groupName, groupDesc, groupAdmin, groupMembers } = req.body;
  try {
    if (!groupName || !groupAdmin || !groupMembers) {
      return res.status(400).json({ message: "Required Fields are Missing" });
    }
    const newGroup = new Group({
      groupName,
      groupAdmin,
      groupMembers: { groupMembers, groupAdmin },
    });

    if (newGroup) {
      generateToken(newGroup._id, res);
      await newGroup.save();
      res.status(201).json({
        _id: newGroup._id,
        groupName: newGroup.groupName,
        groupAdmin: newGroup.groupAdmin,
        profilePic: newGroup.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid Group Data" });
    }
  } catch (error) {
    console.log("Error in Group controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
