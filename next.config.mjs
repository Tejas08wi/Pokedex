/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "pokemon.com",
          pathname: "/pictures/**"
        }
      ]
    }
  };
  
  export default nextConfig;