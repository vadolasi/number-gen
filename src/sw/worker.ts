/// <reference lib="webworker" />
import Zip from "jszip"

declare const self: DedicatedWorkerGlobalScope

type EmailList = { [provider: string]: string[] }

export async function separateEmailsByEmailProvider(emails: string) {
  const emailArray = emails.trim().toLocaleLowerCase().split("\n")

  const zip = new Zip()

  const emailList: EmailList = {}

  for (let email of emailArray) {
    email = email.replace(/\s/g, "")

    if (email.includes("@")) {
      const parts = email.split("@")

      const provider = parts[1]

      if (!emailList[provider]) {
        emailList[provider] = []
      }

      emailList[provider].push(email)
    }
  }

  for (const [provider, emails] of Object.entries(emailList)) {
    if (provider === "gmail.com") {
      console.log(emails)
    }

    const blob = new Blob([emails.join("\n")], { type: "text/plain" })
    zip.file(`${provider}.txt`, blob)
  }

  const blob = await zip.generateAsync({ type: "blob" })

  return URL.createObjectURL(blob)
}
