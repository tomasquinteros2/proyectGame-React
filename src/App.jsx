import { Header } from "./routes/components/Header"
import { HomePage } from "./routes/pages/HomePage"
import {Route,Routes} from "react-router-dom"
import { CardProvider } from "./routes/provider/CardProvider"
import { CarritoProvider } from "./routes/provider/CarritoProvider"
import { Footer } from "./routes/components/Footer"
import { RegisterPage } from "./routes/pages/RegisterPage"
import { LoginPage } from "./routes/pages/LoginPage"
import { AuthProvider } from "./routes/provider/AuthProvider"
import { useAuth } from "./routes/provider/AuthProvider"
import  GamePage  from "./routes/pages/GamePage"
//import { Juego } from "./js/Juego"
export const App = () => {
  return (
    <> 
      <AuthProvider>
        <CarritoProvider>
          <Header></Header>
          <CardProvider>
              <Routes>
                  <Route path="/home" element={<HomePage></HomePage>}></Route>
                  <Route path="/login" element={<LoginPage></LoginPage>}></Route>
                  <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
                  <Route path="/game" element={<GamePage></GamePage>}></Route>
              </Routes>
          </CardProvider>
          <Footer></Footer>
        </CarritoProvider>
      </AuthProvider>
    </>
  )
}
