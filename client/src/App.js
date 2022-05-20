import './App.css';
import BackgroundImagePage from "./Components/BackgroundImgPage";
import NoPageFound from "./Components/NoPageFound";
import Login from "./Components/Login";
import HomeNav from "./Components/HomeNav";
import RequireAuth from "./Components/RequireAuth";
import Register from "./Components/Register";
import PageLayout from "./Components/PageLayout";
import {AuthProvider} from "./Context/AuthProvider";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
  return (
    <div>
      <BackgroundImagePage>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<NoPageFound/>}/>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route element={<RequireAuth/>}>
                        <Route path="/home" element={<PageLayout/>}>
                            <Route path="*" element={<NoPageFound/>}/>
                            {/*<Route path="ChangePassword" element={<ChangePassword/>}/>*/}
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
      </BackgroundImagePage>
    </div>
  );
}

export default App;
