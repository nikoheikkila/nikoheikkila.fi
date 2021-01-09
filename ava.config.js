export default {
  require: ['ts-node/register'],
  files: ['src/__tests__/unit/*.test.ts'],
  extensions: ['ts'],
  concurrency: 5,
  verbose: true,
}
