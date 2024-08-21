import { HistoricContainer, HistoricList, Status } from "./style";

export function Historic(){
    return (
      <HistoricContainer>
        <h1>Histórico</h1>

        <HistoricList>
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Ínicio</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tarefa</td>
                <td>20 minutos</td>
                <td>Há cerca de 2 meses</td>
                <td>
                  <Status statusColor="green">Concluído</Status>
                </td>
              </tr>
              <tr>
                <td>Tarefa</td>
                <td>20 minutos</td>
                <td>Há cerca de 2 meses</td>
                <td>
                  <Status statusColor="yellow">Andamento</Status>
                </td>
              </tr>
              <tr>
                <td>Tarefa</td>
                <td>20 minutos</td>
                <td>Há cerca de 2 meses</td>
                <td>
                  <Status statusColor="red">Interrompido</Status>
                </td>
              </tr>
            </tbody>
          </table>
        </HistoricList>

      </HistoricContainer>

    )
}