import { FormCountdown, TaskInput, Minutes } from "./style"
import { useContext } from "react"
import { CyclesContext } from "../.."
import { useFormContext } from "react-hook-form"

export function CycleForm () {

  //  -- USANDO CONTEXTO -- //
  const { activeCycle } = useContext(CyclesContext)
  
  //  -- USANDO CONTEXTO ESPECIFICO DO USEFORM -- //
  const { register } = useFormContext()

  return (
    <FormCountdown>
      <label htmlFor="tas">Vou trabalhar em</label>
      <TaskInput 
        type="text" 
        id="task" 
        placeholder="De um nome"
        list="task-suggestion"
        disabled ={!!activeCycle}
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
        min={1}
        max={60}
        disabled ={!!activeCycle}
        {...register('minutes', {valueAsNumber: true})}
      />

      <span>Minutos</span>
    </FormCountdown>
  )

}
