import { NextFederationPlugin } from "@module-federation/nextjs-mf";
import { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "rick-and-morty",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./Button": "./components/ui/Button.tsx",
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
      config.output.publicPath = "http://localhost:3001/_next/";
    }

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
      },
    ],
  },
};

export default nextConfig;
