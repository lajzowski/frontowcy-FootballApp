/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{ts,tsx}': ['yarn typecheck', 'yarn prettify', 'yarn lint'],
};
