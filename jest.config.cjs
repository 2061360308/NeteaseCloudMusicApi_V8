module.exports = {
  transform: {},
  // "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?|cjs)$",
  testPathIgnorePatterns: ["/node_modules/", "./test/other/"],
  testMatch: ["<rootDir>/test/*.test.cjs", "<rootDir>/test/*.test.js"],
  maxConcurrency: 1,
  setupFilesAfterEnv: ["./jest.setup.js"],
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./html-report",
        filename: "report.html",
        expand: true,
      },
    ],
  ],
};
