import { Outlet } from "react-router-dom"
import Footer from "./componet/home/Footer"
import { Naver } from "./componet/home/Naver"


function App() {


  return (
    <>

      <Naver />

      <Outlet />
      <Footer />


    </>
  )
}

export default App
