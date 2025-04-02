import { NextRequest, NextResponse } from "next/server";

import RateLimitServices from "@/services/rate-limit/RateLimitServices";

export default async function middleware(req: NextRequest) {
  try {
    const url = req.nextUrl.pathname;

    if (url.startsWith("/api")) {
      await RateLimitServices.apply();
    }
    return NextResponse.next();
  } catch (err) {
    console.error("Rate limit exceeded", err);

    // Se o limite de requisições for excedido, retorna uma resposta com status 429 (Too Many Requests)
    return NextResponse.json(
      { message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }
}
