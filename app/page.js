import LandingCover from "@/component/landingcover";
import Landingnavbar from "@/component/landingnavbar";
import Registration from "@/component/registration";


export default function Home() {
  return (
    <>
    <div><Landingnavbar/></div>
    <div><LandingCover/></div>
    <div><Registration/></div>
    
    </>
  )
}