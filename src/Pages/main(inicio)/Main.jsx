import HeroSection from "./Components/Hero-section/HeroSection"
import About from './Components/About-section/About'
import MenuSection from "./Components/Menu-section/Menu"
import Header from "../../Components/Header/Header"
import Footer from "../../Components/Footer/Footer"

function Main() {
    return(
        <>
            <Header/>
            <HeroSection/>
            <About/>
            <MenuSection/>
            <Footer/>
        </>

    )
}

export default Main