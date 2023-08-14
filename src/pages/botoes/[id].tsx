import { useEffect, useState, useRef } from "preact/hooks"
import { useParams } from "react-router"
import { useSearchParams } from "react-router-dom"
import * as Y from "yjs"
// @ts-ignore
import { WebrtcProvider } from "y-webrtc"
import RandomColor from "randomcolor"

const botoesNames = ["Botão 1", "Botão 2", "Botão 3"]

export default function() {
  const [searchParams] = useSearchParams()
  const { id: room } = useParams() as { id: string }
  const ydoc = useRef(new Y.Doc())
  const [botoes, setBotoes] = useState<Map<string, { textColor: string; color: string }>>(new Map())

  const onClick = (index: number) => {
    if (searchParams.get("create") === "true") {
      const ymap = ydoc.current.getMap("botoes")
      const textColor = RandomColor({ luminosity: "dark" })
      const color = RandomColor({ luminosity: "light" })
      ymap.set(index.toString(), { textColor, color })
    }
  }

  useEffect(() => {
    new WebrtcProvider(`fuhdsahfsdjkfasfaskjdf-${room}`, ydoc.current, { signaling: ["wss://yjs.apps.vadolasi.dev"] })
    const ymap = ydoc.current.getMap("botoes")

    ymap.observeDeep(() => {
      setBotoes(new Map(ymap.entries()))
    })
  }, [])

  return (
    <div class="h-screen w-full flex flex-col gap-5 items-center justify-center">
      {searchParams.get("create") === "true" && (
        <span class="text-2xl">Código da sala: {room}</span>
      )}
      {botoesNames.map((botao, index) => (
        <button
          class="btn"
          style={{
            color: botoes.get(index.toString())?.textColor,
            backgroundColor: botoes.get(index.toString())?.color
          }}
          onClick={() => onClick(index)}
        >
          {botao}
        </button>
      ))}
    </div>
  )
}
