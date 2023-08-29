import { defineConfig } from "vite"
import preact from "@preact/preset-vite"
import Unocss from "unocss/vite"
import Pages from "vite-plugin-pages"
import { comlink } from "vite-plugin-comlink"

export default defineConfig({
  plugins: [
    preact(),
    Unocss(),
    Pages({ resolver: "react", extensions: ["tsx"] }),
    comlink()
  ],
  worker: {
    plugins: [comlink()]
  }
})
