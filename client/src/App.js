import './App.css';
import BackgroundImagePage from "./Components/BackgroundImgPage";
import NoPageFound from "./Components/NoPageFound";
import Login from "./Components/Login";
import Register from "./Components/Register";
import {AuthProvider} from "./Context/AuthProvider";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div>
      <BackgroundImagePage>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
      </BackgroundImagePage>
    </div>
  );
}

export default App;
