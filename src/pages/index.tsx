import { useEffect, useState } from "preact/hooks"
import { workerInstance } from "../utils"

export default function() {
  const [file, setFile] = useState<File | undefined>(undefined)
  const [text, setText] = useState<string>("")

  const download = async () => {
    const url = await workerInstance.separateEmailsByEmailProvider(text)
    const a = document.createElement("a")
    a.href = url
    a.download = "emails.zip"
    a.click()
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const text = reader.result as string

        setText(text)
      }

      reader.readAsText(file)
    }
  }, [file])

  return (
    <div class="h-screen w-full flex flex-col gap-5 items-center justify-center">
      <a className="link" href="https://api.whatsapp.com/send/?phone=%2B5584981437676&text&type=phone_number&app_absent=0">Meu Whatsapp</a>
    </div>
  )
}
