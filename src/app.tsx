export function App() {
  function getPermutations(length: number) {
    let output = ""

    for (let i = Number("1".repeat(length)); i <= Number("9".repeat(length)); i++) {
      if (!i.toString().includes("0")) output += i + "\n"
    }

    return output
  }

  const download = () => {
    const blob = new Blob([getPermutations(4)], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "numbers.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div class="h-screen w-full flex flex-col gap-5 items-center justify-center">
      <p>Essa é uma versão simplificada que gera todos os números de 1 a 9 com <b>4</b> digitos. Para obter a versão completa, <a class="link" href="http://mpago.la/1SBZpNL">Faça o pagamento</a> e <a class="link" href="https://api.whatsapp.com/send/?phone=%2B5584981437676&text&type=phone_number&app_absent=0">me chama no Whatsapp</a></p>
      <button className="btn btn-primary w-full max-w-xs" onClick={download}>Baixar números</button>
    </div>
  )
}
