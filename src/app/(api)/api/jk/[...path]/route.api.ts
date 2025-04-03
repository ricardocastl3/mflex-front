export const dynamic = "force-static";

import { ECOOKIES } from "@/utils/enums";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateTokenSignOnRequest } from "@/services/auth/TokenServices";
import axios, { AxiosError } from "axios";

const bwevipayApi = axios.create({
  baseURL: `${process.env.MFLEX_SERVER_URL}/api/v1`,
  withCredentials: true,
  headers: {
    origin: process.env.MFLEX_NEXT_PUBLIC_URL,
    "mf-server-token": `Karma ${process.env.MFLEX_SERVER_TOKEN}`,
  },
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: any }> }
) {
  try {
    const validateToken = await validateTokenSignOnRequest(req);
    if (!validateToken) {
      return NextResponse.json(
        { message: "Unable to proceed" },
        { status: 400 }
      );
    }

    const { path } = await params;
    const url = new URL(req.url);
    const query = Object.fromEntries(url.searchParams.entries());
    const cookieSafe = await cookies();
    const authToken = cookieSafe.get(ECOOKIES.COOKIE_USER_AUTH_TOKEN)?.value;
    const lang = req.headers.get("accept-language");

    const externalResponse = await bwevipayApi.get(path.join("/"), {
      params: { ...query },
      headers: {
        "accept-language": lang,
        mf: authToken,
      },
    });

    const data = await externalResponse.data;

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    if (err instanceof AxiosError) {
      return NextResponse.json(
        {
          message: err.response?.data.message,
          action: err.response?.data.action,
        },
        { status: 500 }
      );
    }
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: any }> }
) {
  try {
    const validateToken = await validateTokenSignOnRequest(req);
    if (!validateToken) {
      return NextResponse.json(
        { message: "Unable to proceed" },
        { status: 400 }
      );
    }

    let isPostForm = false;
    let externalResponse;

    const findMultipart = req.headers.get("Content-Type");

    if (findMultipart?.split(";")[0] === "multipart/form-data") {
      isPostForm = true;
    }

    const { path } = await params;
    const cookieSafe = await cookies();
    const authToken = cookieSafe.get(ECOOKIES.COOKIE_USER_AUTH_TOKEN)?.value;
    const lang = req.headers.get("accept-language");

    if (isPostForm) {
      const formData = await req.formData();
      externalResponse = await bwevipayApi.postForm(path.join("/"), formData, {
        headers: {
          "accept-language": lang,
          mf: authToken,
        },
      });
    } else {
      const dataRequest = await req.json();
      externalResponse = await bwevipayApi.post(
        path.join("/"),
        { ...dataRequest },
        {
          headers: {
            "accept-language": lang,
            mf: authToken,
          },
        }
      );
    }

    const data = await externalResponse.data;

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    if (err instanceof AxiosError) {
      return NextResponse.json(
        {
          message: err.response?.data.message,
          action: err.response?.data.action,
        },
        { status: 500 }
      );
    }
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ path: any }> }
) {
  try {
    const validateToken = await validateTokenSignOnRequest(req);
    if (!validateToken) {
      return NextResponse.json(
        { message: "Unable to proceed" },
        { status: 400 }
      );
    }

    const { path } = await params;
    const dataRequest = await req.json();

    const cookieSafe = await cookies();
    const authToken = cookieSafe.get(ECOOKIES.COOKIE_USER_AUTH_TOKEN)?.value;
    const lang = req.headers.get("accept-language");

    const externalResponse = await bwevipayApi.put(
      path.join("/"),
      { ...dataRequest },
      {
        headers: {
          "accept-language": lang,
          mf: authToken,
        },
      }
    );

    const data = await externalResponse.data;

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    if (err instanceof AxiosError) {
      return NextResponse.json(
        {
          message: err.response?.data.message,
          action: err.response?.data.action,
        },
        { status: 500 }
      );
    }
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ path: any }> }
) {
  try {
    const validateToken = await validateTokenSignOnRequest(req);
    if (!validateToken) {
      return NextResponse.json(
        { message: "Unable to proceed" },
        { status: 400 }
      );
    }

    const { path } = await params;
    const dataRequest = await req.json();
    const cookieSafe = await cookies();
    const authToken = cookieSafe.get(ECOOKIES.COOKIE_USER_AUTH_TOKEN)?.value;
    const lang = req.headers.get("accept-language");

    const externalResponse = await bwevipayApi.delete(path.join("/"), {
      data: {
        ...dataRequest,
      },
      headers: {
        "accept-language": lang,
        mf: authToken,
      },
    });

    const data = await externalResponse.data;

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    if (err instanceof AxiosError) {
      return NextResponse.json(
        {
          message: err.response?.data.message,
          action: err.response?.data.action,
        },
        { status: 500 }
      );
    }
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
