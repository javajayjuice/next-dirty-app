import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

export const verifyToken = (token) => {
  try {
    
    const decoded = jwt_decode(token);

    if (decoded.iss !== secretKey) {
      throw new Error("Invalid issuer");
    }

    if (decoded.aud !== secretKey) {
      throw new Error("Invalid audience");
    }

    return decoded;
  } catch (error) {
    return null;
  }
};
