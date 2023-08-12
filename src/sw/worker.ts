/// <reference lib="webworker" />

declare const self: DedicatedWorkerGlobalScope

export function getPermutations(length: number) {
  const results: string[] = []

  function helper(temp: string, len: number) {
    if (temp.length === len) {
      results.push(temp)
      return
    }

    for (let i = 1; i <= 9; i++) {
      helper(temp + i, len)
    }
  }

  helper("", length)
  return results.join("\n")
}

type EmailList = { [provider: string]: string[] }

export function separateEmailsByEmailProvider(emails: string): EmailList {
  let emailArray = emails.split("\n")

  let emailList: EmailList = {}

  for (let email of emailArray) {
    let parts = email.split("@")

    if (parts.length < 2) continue

    let provider = parts[1];

    if (!emailList[provider]) {
      emailList[provider] = []
    }

    emailList[provider].push(email)
  }

  return emailList
}
