"use server";

import { getSession } from "@auth0/nextjs-auth0";
import day from "dayjs";
import { PrismaClient, Part } from "@prisma/client";
import checkAuth from "./checkAuth";

const prisma = new PrismaClient();

const bodyPartsToPrisma = {
  head: Part.HEAD,
  leftShoulder: Part.LEFT_SHOULDER,
  rightShoulder: Part.RIGHT_SHOULDER,
  leftArm: Part.LEFT_ARM,
  rightArm: Part.RIGHT_ARM,
  chest: Part.CHEST,
  stomach: Part.STOMACH,
  leftLeg: Part.LEFT_LEG,
  rightLeg: Part.RIGHT_LEG,
  rightHand: Part.RIGHT_HAND,
  leftHand: Part.LEFT_HAND,
  leftFoot: Part.LEFT_FOOT,
  rightFoot: Part.RIGHT_FOOT,
};

const updateReport = async (id: string, formData: any) => {
  const { name, date, time, part, details } = JSON.parse(formData);
  const session = await getSession();
  const dbUser = await checkAuth(session);

  if (typeof dbUser === "string") {
    return dbUser;
  }

  const dateObj = day(date).toDate();
  const timeObj = day(time).toDate();
  const dateTime = day(dateObj)
    .set("hour", timeObj.getHours())
    .set("minute", timeObj.getMinutes())
    .toDate();

  await prisma.injury.update({
    where: {
      id,
    },
    data: {
      name,
      dateTime,
      part: bodyPartsToPrisma[part as keyof typeof bodyPartsToPrisma],
      details: details,
      user: {
        connect: {
          id: dbUser.id,
        },
      },
    },
  });

  return JSON.stringify({ id, part, details });
};

export default updateReport;
