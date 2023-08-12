import { useEffect, useState } from "preact/hooks"
import { workerInstance } from "../utils"
import Zip from "jszip"

export default function() {
  const [file, setFile] = useState<File | undefined>(undefined)
  const [text, setText] = useState<string>("")

  const download = async () => {
    const providers = await workerInstance.splitEmails(text)

    const zip = new Zip()

    for (const [provider, emails] of Object.entries(providers)) {
      const blob = new Blob(emails, { type: "text/plain" })
      zip.file(`${provider}.txt`, blob)
    }

    const blob = await zip.generateAsync({ type: "blob" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "numbers.zip"
    a.click()
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const text = reader.result as string

        setText(text.split("\n").slice(0, 20).join("\n"))
      }

      reader.readAsText(file)
    }
  }, [file])

  return (
    <div class="h-screen w-full flex flex-col gap-5 items-center justify-center">
      <p>Essa é uma versão simplificada que separa apenas os <b>20</b> primeiros números. Para obter a versão completa <a class="link" href="http://mpago.la/1YQSk2k">Faça o pagamento</a> e <a class="link" href="https://api.whatsapp.com/send/?phone=%2B5584981437676&text&type=phone_number&app_absent=0">me chame no Whatsapp</a></p>
      <input type="file" class="file-input w-full max-w-xs" onChange={e => setFile(e.currentTarget.files?.[0])} />
      <button className="btn btn-primary w-full max-w-xs" disabled={!text} onClick={download}>Baixar números</button>
    </div>
  )
}
