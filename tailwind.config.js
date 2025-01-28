/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './resources/**/*.edge',
    './resources/**/*.{js,ts,jsx,tsx,vue}',
    './inertia/{components,pages,app,layouts}/**/*.{js,ts,jsx,tsx,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
