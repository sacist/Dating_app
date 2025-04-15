import { Route,Routes } from "react-router-dom";
import { WelcomingPage } from "./pages/welcomingPage/welcoming-page";
import { RegisterPage } from "./libs/authPage/pages/register-page";
import { LoginPage } from "./libs/authPage/pages/login-page";
import { ProfilePage } from "./pages/profilePage/profilePage";
import { ChatPage } from "./pages/chatPage/chatPage";

export const Router=() => {

  return(
    <Routes>
        <Route path="" element={<WelcomingPage/>}/>
        <Route path="/register/*" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/profile/:nickname" element={<ProfilePage/>}/>
        <Route path="/chat" element={<ChatPage/>}/>
    </Routes>
  )
}