import { HeaderContainer } from "./Header";
import logo from '../../images/logo-feed.svg'
import { Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header(){
  return (
    <HeaderContainer>
      <img src={ logo } alt="" />
      <nav>
        <NavLink  to="/" title="timer">
          <Timer size={24} />
        </NavLink >
        <NavLink  to="historic" title="histórico">
          <Scroll size={24}/>
        </NavLink >
      </nav>
    </HeaderContainer>
  )
}