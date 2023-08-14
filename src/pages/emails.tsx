import { useEffect, useState } from "preact/hooks"
import Zip from "jszip"
import { workerInstance } from "../utils"

export default function() {
  const [file, setFile] = useState<File | undefined>(undefined)
  const [text, setText] = useState<string>("")

  const download = async () => {
    const providers = await workerInstance.separateEmailsByEmailProvider(text)

    const zip = new Zip()

    for (const [provider, emails] of Object.entries(providers)) {
      const blob = new Blob([emails.join("\n")], { type: "text/plain" })
      zip.file(`${provider}.txt`, blob)
    }

    const blob = await zip.generateAsync({ type: "blob" })
    const url = URL.createObjectURL(blob)
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

        setText(text.split("\n").slice(0, 30).join("\n"))
      }

      reader.readAsText(file)
    }
  }, [file])

  return (
    <>
    {/*
    <div class="h-screen w-full flex flex-col gap-5 items-center justify-center">
      <input type="file" class="file-input w-full max-w-xs" onChange={e => setFile(e.currentTarget.files?.[0])} />
      <button className="btn btn-primary w-full max-w-xs" disabled={!text} onClick={download}>Baixar</button>
    </div>
    */}
    <div class="h-screen w-full flex flex-col gap-5 items-center justify-center">
      <h1>Para ter acesso ao sistema, não esqueça de me chamar lá no Workana novamente para prosseguirmos com o projeto ;)</h1>
    </div>
    </>
  )
}
