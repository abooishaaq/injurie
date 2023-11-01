"use server";

import { getSession } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import checkAuth from "./checkAuth";

const prisma = new PrismaClient();

export const getReports = async () => {
  const session = await getSession();

  const dbUser = await checkAuth(session);

  if (typeof dbUser === "string") {
    return dbUser;
  }

  const reports = await prisma.injury.findMany({
    where: {
      userId: dbUser.id,
    },
    select: {
      dateTime: true,
      part: true,
      details: true,
      createdAt: true,
      id: true,
      name: true,
    },
  });

  return JSON.stringify(reports);
};

export const getReport = async (id: string) => {
  const session = await getSession();

  const dbUser = await checkAuth(session);

  if (typeof dbUser === "string") {
    return dbUser;
  }

  const report = await prisma.injury.findUnique({
    where: {
      id: id,
      userId: dbUser.id,
    },
    select: {
      dateTime: true,
      part: true,
      details: true,
      createdAt: true,
      name: true,
    },
  });

  return JSON.stringify(report);
};
