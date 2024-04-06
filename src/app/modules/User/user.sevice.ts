import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const registerUser = async (
  name: string,
  email: string,
  password: string,
  profile: any
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      profile: {
        create: profile,
      },
    },
    include: {
      profile: true,
    },
  });

  return user;
};

const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const UserServices = {
  registerUser,
  getUserByEmail,
};
