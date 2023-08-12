import { workerInstance } from "../utils"

export default function() {
  const download = async () => {
    const blob = new File([await workerInstance.getPermutations(6)], "numbers.txt", { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "numbers.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div class="h-screen w-full flex flex-col gap-5 items-center justify-center">
      <p>Essa é uma versão simplificada que gera todos os números de 1 a 9 com <b>6</b> digitos. Para obter a versão completa, <a class="link" href="http://mpago.la/1SBZpNL">Faça o pagamento</a> e <a class="link" href="https://api.whatsapp.com/send/?phone=%2B5584981437676&text&type=phone_number&app_absent=0">me chame no Whatsapp</a></p>
      <button className="btn btn-primary w-full max-w-xs" onClick={download}>Baixar</button>
    </div>
  )
}
