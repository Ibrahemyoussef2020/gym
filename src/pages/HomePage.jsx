import {HomeHeader, MainStart , MainAbout, OurPlan, HomeCoaches, Footer, VisitGymAndRegister} from "../components"

const HomePage = () => {
  return (
    <>
    <HomeHeader/>
    <main>  
        <MainStart/>
        <MainAbout/>
        <OurPlan />
        <HomeCoaches />
        <VisitGymAndRegister />
    </main>
    <Footer />
    </>
  )
}

export default HomePage