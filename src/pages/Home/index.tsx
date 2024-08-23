import { createContext, useState } from "react";
import { HandPalm, Play } from "phosphor-react";
import {HomeBox,StartCountdownBtn, StopCountdownBtn } from "./style";
import { CycleForm } from "./components/cycleForm";
import { Countdown } from "./components/countdown";
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"

// -- TIPAGENS -- //
  interface Cycle {
    id: string
    task: string
    minutes: number
    startDate: Date
    finished?: Date
  }
  
  interface CyclesContextData {
    activeCycle: Cycle | undefined,
    activeIdCycle: string | null,
    secondsPassed: number
    finishedCycleFunctionSending: () => void
    sendSetSecondPassed: (seconds: number) => void
  }


  // -- CRIANDO CONTEXTO -- //
  export const CyclesContext = createContext({} as CyclesContextData)


  export function Home(){

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeIdCycle, setActiveIdCycle] =  useState<string | null>(null)
    const [secondsPassed, SetsecondsPassed] = useState(0)  
  
    const activeCycle = cycles.find(cycles => cycles.id === activeIdCycle)
    
    // --- Enviando o setCycles para CycleForm ---- //
    function finishedCycleFunctionSending(){
        setCycles((state) => state.map(cycle => {
          if(cycle.id === activeIdCycle){
            return {...cycle, finished: new Date}
          } else {
            return cycle
          }
        })
      )
    }
    
    // -- CRIANDO NOVO CICLO DO TIMER -- //
    function handleCreateCycle(data: newCycleFormData){
      const newCycle: Cycle = {
        id: String(new Date().getTime()) ,
        task: data.task,
        minutes: data.minutes,
        startDate: new Date()
      }
      setCycles((cycles)=>[...cycles, newCycle]) 
      setActiveIdCycle(newCycle.id)
      SetsecondsPassed(0)
      reset()
    }

    // -- INTERROMPENDO ATUAL CICLO DO TIMER -- //
    function handleInterrupCycle() {
      setCycles((state) => state.map(cycle => {
        if(cycle.id === activeIdCycle){
          return {...cycle, interrupt: new Date}
        } else {
          return cycle
        }
      }))
      setActiveIdCycle(null)
    }

      // --- Enviando o setSecondPassed para Countdown ---- //
    function sendSetSecondPassed(seconds: number){
      SetsecondsPassed(seconds)
    }

    // --- VALIDAÇÃO DO FORMULARIO ---- //
    type newCycleFormData = zod.infer<typeof schemaFormValidation>

    const schemaFormValidation = zod.object({
      task: zod.string().min(1, 'Informe a tarefa'),
      minutes: zod.number().min(1).max(60)
    })

    const newCycleForm  = useForm<newCycleFormData>({
      resolver: zodResolver(schemaFormValidation),
      defaultValues: {
        task: '',
        minutes: 0
      }
    })

    const {handleSubmit, reset} = newCycleForm

    return(
      <HomeBox>
          <form onSubmit = {handleSubmit(handleCreateCycle)} action="">
            <CyclesContext.Provider value={
                {
                  activeCycle, 
                  activeIdCycle, 
                  finishedCycleFunctionSending,
                  secondsPassed,
                  sendSetSecondPassed
                }
              }>
              <FormProvider {...newCycleForm}>
                <CycleForm/>
              </FormProvider>

              <Countdown/>
            </CyclesContext.Provider>

            {activeCycle ?  (
            <StopCountdownBtn onClick = {handleInterrupCycle} type="button">
              Interromper
              <HandPalm  size = {24}/>
            </StopCountdownBtn>
            ) : (
            <StartCountdownBtn  type='submit'>
              <Play />	
              Começar
            </StartCountdownBtn>
            )}
          </form>
      </HomeBox> 
      )
    }