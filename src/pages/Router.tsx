import { Routes, Route } from "react-router-dom"
import { Home } from "../../src/pages/Home/index"
import { Historic } from "../../src/pages/Historic/index"
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