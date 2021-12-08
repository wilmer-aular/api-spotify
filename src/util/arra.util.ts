const LosslessJSON = require("lossless-json");

export const toJsonList = (value: any) => {
  if (value.charAt(0) === "[") {
    return LosslessJSON.parse(value);
  }
  const valueList = "[" + value + "]";
  return LosslessJSON.parse(valueList);
};

export const listToString = (v: any) => {
  if (v.length) {
    const transformer = LosslessJSON.stringify(v);
    return transformer.substring(1, transformer.length - 1);
  }
  return "";
};
