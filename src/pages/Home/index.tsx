import { useEffect, useState } from "react";
import { Play } from "phosphor-react";
import { CountdownTimer, FormCountdown, HomeBox, Minutes, Separator, StarCountdownBtn, TaskInput } from "./style";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { differenceInSeconds } from "date-fns";
import * as zod from "zod"

  // Validação de formulario pelo Zod + useForm
  const schemaFormValidation = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutes: zod.number().min(5).max(60)
  })


  type newCycleFormData = zod.infer<typeof schemaFormValidation>

  interface Cycle {
    id: string
    task: string
    minutes: number
    startDate: Date
  }

 
  export function Home(){

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeIdCycle, setActiveIdCycle] =  useState<string | null>(null)
    const [secondsPassed, SetsecondsPassed] = useState(0)
    
    const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
      resolver: zodResolver(schemaFormValidation),
      defaultValues: {
        task: '',
        minutes: 0
      }
    })

    const activeCycle = cycles.find(cycles => cycles.id === activeIdCycle)

    useEffect(() => {
      if(activeCycle){
        setInterval(() => {
          SetsecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate))
        }, 1000)
      }
    },[activeCycle])

    const watchTask = watch('task')
    const isSubmitDisabled = !watchTask

   
    const totalSeconds = activeCycle ?  activeCycle.minutes * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - secondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutesNumber = String(minutesAmount).padStart(2, '0')
    const secondsNumber = String(secondsAmount).padStart(2, '0')

    function handleCreateCycle(data: newCycleFormData){
      const newCycle: Cycle = {
        id: String(new Date().getTime()) ,
        task: data.task,
        minutes: data.minutes,
        startDate: new Date()
      }

      setCycles((cycles)=>[...cycles, newCycle]) 
      setActiveIdCycle(newCycle.id)

      reset()
    }


    return(
      <HomeBox>
          <form onSubmit = {handleSubmit(handleCreateCycle)} action="">
            <FormCountdown>
              <label htmlFor="tas">Vou trabalhar em</label>
              <TaskInput 
                type="text" 
                id="task" 
                placeholder="De um nome"
                list="task-suggestion"
                {...register('task')}
              />

              <datalist id="task-suggestion">
                <option value="projeto 1"></option>
                <option value="projeto 2"></option>
              </datalist>


              <label htmlFor="minutesForm">Durante</label>
              <Minutes 
                type="number" 
                id="minutesForm" 
                placeholder="00"
                step={5}
                min={5}
                max={60}
                {...register('minutes', {valueAsNumber: true})}
              />

              <span>Minutos</span>
            </FormCountdown>
            
            <CountdownTimer>
              <span>{minutesNumber[0]}</span>
              <span>{minutesNumber[1]}</span>
              <Separator>:</Separator>
              <span>{secondsNumber[0]}</span>
              <span>{secondsNumber[1]}</span>
            </CountdownTimer>

            <StarCountdownBtn disabled = {isSubmitDisabled} type='submit'>
              <Play />	
              Começar
            </StarCountdownBtn>
          </form>

      </HomeBox> 
      )
  }