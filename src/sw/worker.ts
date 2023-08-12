/// <reference lib="webworker" />

import { getPermutations, separateEmailsByEmailProvider } from "../utils"

declare const self: DedicatedWorkerGlobalScope

export const generateNumbers = (length: number) => {
  return getPermutations(length)
}

export const splitEmails = (emails: string) => {
  return separateEmailsByEmailProvider(emails)
}
