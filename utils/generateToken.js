import jwt from "jsonwebtoken";

const generateToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1m",
  });
  return token;
};

export default generateToken;
