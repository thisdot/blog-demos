import type { Serverless } from "serverless/aws";

const serverlessConfiguration: Serverless = {
  service: "serverless-setup-demo",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
    },
  },
  package: {
    individually: true, // individually package functions for better cold starts
  },
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
    profile: "thisdot", // This is the alias for the account I use
    memorySize: 512, // default lambda memory to 512MB
    timeout: 10, // set default timeout for functions to 10s
    tracing: {
      // enable x-ray tracing for better debugging
      apiGateway: true,
      lambda: true,
    },
  },
  functions: {
    healthcheck: {
      handler: "index.handler",
      events: [
        {
          httpApi: {
            path: "/healthcheck",
            method: "get",
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
