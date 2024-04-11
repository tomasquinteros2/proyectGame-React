import { Header } from "./routes/components/Header"
import { HomePage } from "./routes/pages/HomePage"
import { CuatroEnLineaPage } from "./routes/pages/CuatroEnLineaPage"
import {Route,Routes} from "react-router-dom"

export const App = () => {
  return (
    <>
        <Header></Header>
        <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/4-en-linea" element={<CuatroEnLineaPage></CuatroEnLineaPage>}></Route>
        </Routes>
    </>
  )
}
