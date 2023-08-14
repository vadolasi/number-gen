import { useState } from "preact/hooks"
import { useNavigate } from "react-router"

export default function() {
  const [room, setRoom] = useState<number | null>(null)
  const navigate = useNavigate()

  const openRoom = () => {
    if (room) {
      navigate(`/botoes/${room}`)
    }
  }

  const createRoom = () => {
    const id = Math.floor(Math.random() * 1000000)

    navigate(`/botoes/${id}?create=true`)
  }

  return (
    <div class="h-screen w-full flex flex-col gap-5 items-center justify-center">
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Número da sala</span>
        </label>
        <input type="number" class="input input-bordered w-full max-w-xs" value={room || undefined} onInput={e => setRoom(e.currentTarget.valueAsNumber)} />
      </div>
      <button class="btn w-full max-w-xs" disabled={!room} onClick={openRoom}>Entrar</button>
      <button class="btn btn-primary w-full max-w-xs" onClick={createRoom}>Criar sala</button>
    </div>
  )
}
