import { useState } from "preact/hooks"
import { Wheel } from "react-custom-roulette"
import toast from "react-hot-toast"

const data = [
  { option: "1" },
  { option: "2" },
  { option: "3" },
  { option: "4" },
  { option: "5" },
  { option: "6" },
  { option: "7" },
  { option: "8" },
  { option: "9" },
  { option: "10" }
]

export default () => {
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length)
      setPrizeNumber(newPrizeNumber)
      setMustSpin(true)
    }
  }

  return (
    <div class="h-screen w-full flex flex-col gap-10 items-center justify-center">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={["#3e3e3e", "#f2f2f2"]}
        onStopSpinning={() => {
          setMustSpin(false)
          toast.success(`Você tirou o número ${prizeNumber}!`)
        }}
      />
      <button class="btn btn-primary" onClick={handleSpinClick}>Girar</button>
    </div>
  )
}
