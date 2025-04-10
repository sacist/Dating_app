import { Router } from "./router";
import { AppWideModules } from "./modules";

export const App = () => {
  return (
    <>   
    <AppWideModules/>
    <Router />
    </>
  )
}