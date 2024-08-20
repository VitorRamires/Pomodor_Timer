import { Routes, Route } from "react-router-dom"
import { Home } from "./home"
import { Historic } from "./historic"
import { DefaultLayout } from "../layouts/DefaultLayout"

export function Router(){
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path='historic' element={<Historic />} />
      </Route>
	</Routes>
  )
}