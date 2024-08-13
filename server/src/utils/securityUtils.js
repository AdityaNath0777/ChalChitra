import xss from "xss";

const sanitizeInput = (input) => {
  return xss(input);
};

export { sanitizeInput };
