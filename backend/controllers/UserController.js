import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

export const createUser = async (req, res) => {
  const { fullName, userName, rawPassword } = req.body;
  try {
    console.log("Creating new user");
    const password = await bcrypt.hash(rawPassword, 10);
    const newUser = await UserModel.create({
      fullName,
      userName,
      password,
    });
    return res.status(201).json({
      status: "Berhasil",
      data: {
        name: newUser.fullName,
        username: newUser.userName,
      },
    });
  } catch (e) {
    return res.status(500).json({
      status: "Gagal membuat user",
      error: e.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    return res.status(200).json({
      status: "Berhasil mendapatkan data",
      users,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Gagal mendapatkan data",
      error: err,
    });
  }
};

export const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    await UserModel.deleteOne({ _id: id });
    return res.status(204).json({
      status: "Berhasil menghapus data pengguna.",
    });
  } catch (err) {
    return res.status(500).json({
      status: "Gagal menghapus data pengguna",
      error: err,
    });
  }
};
