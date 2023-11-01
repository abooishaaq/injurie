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

const createReport = async (formData: any) => {
  const { name, age, date, time, ...bodyParts } = JSON.parse(formData);
  const session = await getSession();
  const dbUser = await checkAuth(session);

  if (typeof dbUser === "string") {
    return dbUser;
  }

  const bodyPartsArr = Object.keys(bodyParts);
  const dateObj = day(date).toDate();
  const timeObj = day(time).toDate();
  const dateTime = day(dateObj)
    .set("hour", timeObj.getHours())
    .set("minute", timeObj.getMinutes())
    .toDate();

  for (const bodyPart of bodyPartsArr) {
    const injury =
      bodyPartsToPrisma[bodyPart as keyof typeof bodyPartsToPrisma];
    await prisma.injury.create({
      data: {
        name,
        dateTime,
        part: injury,
        details: bodyParts[bodyPart],
        user: {
          connect: {
            id: dbUser.id,
          },
        },
      },
    });
  }
};

export default createReport;
