import { Session } from "@auth0/nextjs-auth0";
import { Nullable } from "../typing";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const checkAuth = async (session: Nullable<Session> | undefined) => {
  if (!session) {
    return JSON.stringify({
      error: "No session",
    });
  }

  const user = session.user;
  if (!user) {
    return JSON.stringify({
      error: "No user",
    });
  }

  let dbUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (!dbUser) {
    return JSON.stringify({
      error: "User not found",
    });
  }

  return dbUser;
};

export default checkAuth;
