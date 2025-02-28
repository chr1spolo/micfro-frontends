import { NextFederationPlugin } from "@module-federation/nextjs-mf";
import { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "harry-potter",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./CharacterList": "./components/character-list.tsx",
        },
        shared: {},
        extraOptions: {
          exposePages: true,
          enableImageLoaderFix: true,
          enableUrlLoaderFix: true,
        },
      })
    );
    if (!isServer) {
      config.output.publicPath = "http://localhost:3002/_next/";
    }

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hp-api.onrender.com",
      },
    ],
  },
};

export default nextConfig;
