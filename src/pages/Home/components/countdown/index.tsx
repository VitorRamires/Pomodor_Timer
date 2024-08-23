import { CountdownTimer, Separator } from "./style"
import { useEffect, useContext } from "react"
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../..";


export function Countdown(){

  // -- USANDO CONTEXTO -- //
  const { 
    activeCycle, 
    activeIdCycle,
    finishedCycleFunctionSending,
    secondsPassed,
    sendSetSecondPassed
  } = useContext(CyclesContext)



  // -- TRASFORMANDO NÚMEROS DO TIMER -- //
  const totalSeconds = activeCycle ?  activeCycle.minutes * 60 : 0

  const currentSeconds = activeCycle ? totalSeconds - secondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutesNumber = String(minutesAmount).padStart(2, '0')
  const secondsNumber = String(secondsAmount).padStart(2, '0')


    // -- LIDANDO COM A PASSAGEM DE TEMPO DO TIMER -- //
  useEffect(() => {
    let interval: number;
    if(activeCycle){
       interval = setInterval(() => {

        const secondsDifference = differenceInSeconds(
          new Date(), 
          activeCycle.startDate
        )

        if(secondsDifference >= totalSeconds){
          finishedCycleFunctionSending()
          sendSetSecondPassed(totalSeconds)            
          clearInterval(interval)
        } else {
          sendSetSecondPassed(secondsDifference)
        }
        
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  },[activeCycle, 
    totalSeconds, 
    activeIdCycle, 
    finishedCycleFunctionSending, 
    sendSetSecondPassed])

  return(
    <CountdownTimer>
      <span>{minutesNumber[0]}</span>
      <span>{minutesNumber[1]}</span>
      <Separator>:</Separator>
      <span>{secondsNumber[0]}</span>
      <span>{secondsNumber[1]}</span>
    </CountdownTimer>
  )

}