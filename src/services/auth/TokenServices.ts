"use server";

import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { NextRequest } from "next/server";
import RateLimitServices from "../rate-limit/RateLimitServices";

export async function validateTokenSignOnRequest(req: NextRequest) {
  try {
    const url = req.nextUrl.pathname;

    if (url.startsWith("/api")) {
      await RateLimitServices.apply();

      const headerToken = req.headers.get("authorization");

      if (!headerToken) {
        console.log(req.headers);
        return false;
      }

      const splitToken = headerToken.split(" ");
      if (splitToken.length < 1) {
        console.log(req.headers);
        return false;
      }

      const typeToken = splitToken[0];
      const rawToken = splitToken[1];

      if (typeToken != "Bearer") {
        console.log(req.headers);
        return false;
      }

      const publicKey = process.env.MFLEX_PUBLIC_ECDSA_KEY;
      const tokenVerified = jwt.verify(rawToken, publicKey, {
        algorithms: ["ES256"],
      });

      if (!tokenVerified) {
        console.log("INVALID TOKEN:", req.headers);
        return false;
      }
      return true;
    }
  } catch (err) {
    // Lidar com erros JWT de maneira mais específica
    if (err instanceof TokenExpiredError) {
      console.error("Token has expired");
    } else if (err instanceof JsonWebTokenError) {
      console.error("Invalid JWT token:", err.message);
    } else {
      console.error(
        "An unknown error occurred during token verification:",
        err
      );
    }
    return false;
  }
}
