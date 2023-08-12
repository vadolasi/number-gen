import { defineConfig } from "vite"
import preact from "@preact/preset-vite"
import Unocss from "unocss/vite"

export default defineConfig({
  plugins: [preact(), Unocss()]
})
