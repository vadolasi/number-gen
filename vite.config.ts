import { defineConfig } from "vite"
import preact from "@preact/preset-vite"
import Unocss from "unocss/vite"
import Pages from "vite-plugin-pages"
import { comlink } from "vite-plugin-comlink"
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator"

export default defineConfig({
  plugins: [
    preact(),
    Unocss(),
    Pages({ resolver: "react", extensions: ["tsx"] }),
    comlink(),
    obfuscatorPlugin({
      exclude: [/node_modules/],
      apply: "build",
      debugger: true,
      options: {
        debugProtection: true
      }
    })
  ],
  worker: {
    plugins: [comlink()]
  }
})
