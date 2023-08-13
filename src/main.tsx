import { render } from "preact"
import { Suspense } from "preact/compat"
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom"
import "@unocss/reset/tailwind.css"
import "uno.css"
import "virtual:unocss-devtools"
import routes from "~react-pages"
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <Suspense fallback={<div class="h-screen w-full flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>}>
      {useRoutes(routes)}
      <Toaster />
    </Suspense>
  )
}

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")!
)
