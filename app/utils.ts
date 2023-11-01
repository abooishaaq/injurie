export const capsKebabCaseToSentenceCase = (str: string) => {
  let split = str.split("_");
  let capFirst = (x: string) =>
    x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
  return (
    capFirst(split[0]) + (split.length > 1 ? " " + capFirst(split[1]) : "")
  );
};

export const camelCaseToSentenceCase = (str: string) => {
  const result = str.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

export const bodyPartsAll = [
  "head",
  "leftShoulder",
  "rightShoulder",
  "leftArm",
  "rightArm",
  "chest",
  "stomach",
  "leftLeg",
  "rightLeg",
  "rightHand",
  "leftHand",
  "leftFoot",
  "rightFoot",
];

export const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};
