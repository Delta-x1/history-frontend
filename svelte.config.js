import adapter from "@sveltejs/adapter-node"; // Chuyển từ adapter-auto sang adapter-node

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    runes: ({ filename }) =>
      filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
  },
  kit: {
    adapter: adapter({
      // Tùy chọn cho adapter-node
      out: "build",
      precompress: false,
      envPrefix: "",
    }),
  },
};

export default config;
