export default {
  require: ["ts-node/register"],
  files: ["src/__tests__/feature/*.test.ts"],
  extensions: ["ts"],
  concurrency: 5,
  verbose: true,
};
