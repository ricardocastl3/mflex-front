/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const isDev = process.env.NODE_ENV === "development";

const nextConfig = withPWA({
  disable: isDev,
  dest: "public",
  register: true,
  skipWaiting: true,
})({
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "pps.whatsapp.net",
        protocol: "https",
      },
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
      },
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
      },
      {
        hostname: "img.freepik.com",
        protocol: "https",
      },
      {
        hostname: "cdn.ausoftdevelop.com",
        protocol: "https",
      },
      {
        hostname: "firebasestorage.googleapis.com",
        protocol: "https",
      },
      {
        hostname: "images.pexels.com",
        protocol: "https",
      },
      {
        hostname: "pbs.twimg.com",
        protocol: "https",
      },
    ],
  },
  env: {
    MFLEX_NEXT_API_TOKEN: process.env.MFLEX_NEXT_API_TOKEN,
    MFLEX_PUBLIC_ECDSA_KEY: process.env.MFLEX_PUBLIC_ECDSA_KEY,
    MFLEX_NEXT_PUBLIC_URL: process.env.MFLEX_NEXT_PUBLIC_URL,
    MFLEX_SERVER_URL: process.env.MFLEX_SERVER_URL,
    MFLEX_SERVER_TOKEN: process.env.MFLEX_SERVER_TOKEN,
    MFLEX_STREAMIN_SERVER_URL: process.env.MFLEX_STREAMIN_SERVER_URL,
    MFLEX_STREAMING_SERVER_TOKEN: process.env.MFLEX_STREAMING_SERVER_TOKEN,

    VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ];
  },
});

export default nextConfig;
