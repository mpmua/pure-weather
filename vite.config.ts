import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    root: "./src",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
                settingsPage: resolve(__dirname, "./src/settings.html")
            }
        },
        outDir: "../dist",
        minify: false,
        emptyOutDir: true
    }
});
