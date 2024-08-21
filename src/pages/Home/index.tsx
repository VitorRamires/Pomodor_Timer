import { Play } from "phosphor-react";
import { CountdownTimer, FormCountdown, HomeBox, Minutes, Separator, StarCountdownBtn, TaskInput } from "./style";

export function Home(){
  return(

    <HomeBox>
      
        <form action="">
          
					<FormCountdown>
						<label htmlFor="tas">Vou trabalhar em</label>
            <TaskInput 
              type="text" 
              id="task" 
              placeholder="De um nome"
              list="task-suggestion"
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
            />

						<span>Minutos</span>
          </FormCountdown>
          
          <CountdownTimer>
            <span>0</span>
            <span>0</span>
            <Separator>:</Separator>
            <span>0</span>
            <span>0</span>
          </CountdownTimer>

					<StarCountdownBtn disabled type='submit'>
						<Play />	
						Começar
					</StarCountdownBtn>
				</form>

    </HomeBox>
      
    )
}