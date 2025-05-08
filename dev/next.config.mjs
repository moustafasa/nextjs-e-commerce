/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      {
        protocol: "https",
        hostname: "dssgraxhulubwyc1.public.blob.vercel-storage.com",
      },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
