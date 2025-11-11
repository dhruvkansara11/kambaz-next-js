import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Load Next.js & TypeScript recommended settings
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Ignore build folders
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },

  // Global rule overrides (silence common warnings)
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // allows use of "any"
      "@typescript-eslint/no-unused-vars": "off", // ignores unused variables
      "react-hooks/exhaustive-deps": "off", // disables missing deps warnings
      "@next/next/no-img-element": "off", // allows using <img> instead of <Image>
      "react/no-unescaped-entities": "off", // allows single quotes like “I’m”
      "react/jsx-key": "off", // silences missing key prop warnings
    },
  },
];

export default eslintConfig;
