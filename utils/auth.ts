import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

export interface IDecodedToken {
  readonly "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"?: string;
  readonly "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"?: string;
  readonly "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string;
  readonly iss?: string;
  readonly aud?: string;
  readonly exp?: number;
}

export interface IUserDetails {
  emailAddress?: string;
  name?: string;
  nameIdentifier?: string;
}

export const myTokenDetails = () => {
  try {
    if (typeof window == "object") {
      const token = localStorage.getItem("token");

      if (!!token) {
        var decoded = jwt_decode(token) as IDecodedToken;

        const isValidToken = Math.floor(new Date().getTime() / 1000) <= decoded?.exp;

        if (isValidToken) {
          const {
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress":
              emailAddress,
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": name,
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier":
              nameIdentifier,
          } = decoded;

          const accountDetails = {
            user: { emailAddress, name, nameIdentifier },
            accessToken: token,
          };

          console.log('accountDetails', accountDetails)
          return accountDetails;
        } else {
          return null;
        }
      }
    } else {
    }
  } catch (error) {
    return null;
  }
  return null;
};
