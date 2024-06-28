/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Without this setting, the Next.js compilation step will routinely
    // try to import files such as `LICENSE` from the `newrelic` module.
    // Note that this property will be renamed in the future: https://github.com/vercel/next.js/pull/65421
    serverComponentsExternalPackages: ["newrelic"],
  }
};

export default nextConfig;
