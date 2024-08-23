import styled from "styled-components";

export const HomeBox = styled.div`

  //homeBox pai
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;


  form{
    display:flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }

`

export const BaseCountdownBtn = styled.button`
  width: 100%;
  border:0;
  padding:1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;
  transition: 0.2s;
  cursor:pointer;
`

export const StartCountdownBtn = styled(BaseCountdownBtn)`
  background-color: ${props => props.theme['green-500']};
  color: ${props => props.theme['gray-100']};

  &:hover{
    background-color: ${props => props.theme['green-700']};
  }
`

export const StopCountdownBtn = styled(BaseCountdownBtn)`
  background-color: ${props => props.theme['red-500']};
  color: ${props => props.theme['white']};

  &:hover{
    background-color: ${props => props.theme['red-700']};
  }
`