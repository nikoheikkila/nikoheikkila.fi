module.exports = {
    ignorePatterns: ["node_modules/", "/.cache/", "/public/", "/.netlify/"],
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    overrides: [],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint"],
    rules: {
        "react/prop-types": "off",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
