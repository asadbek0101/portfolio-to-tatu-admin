import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { request } from "../api/request";
import { set_user_profile } from "../redux/action";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Pages, RouteContainerTabs } from "../constants/Routes";
import AuthContainer from "./AuthContainer";
import AppContainer from "./AppContainer";
import ExposureContainer from "./ExposureContainer";
import ArticleContainer from "./ArticleContainer";
import QualificationContainer from "./QualificationContainer";
import IndependentWorkContainer from "./IndependentWorkContainer";
import PracticalContainer from "./PracticalWorkContainer";
import ImagesContainer from "./ImagesContainer";
import MyInformationContainer from "./MyInformationContainer";
import DGUContainer from "./DGUContainer";

export default function RootContainer(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = useCallback((value: any)=>{
                if(value.email !== "admin@gmail.com" && value.password === "admin2233"){
                    toast.error("Login not found ")
                } else if(value.email === "admin@gmail.com" && value.password !== "admin2233"){
                    toast.error("Password is uncorrect")
                } else if(value.email === "admin@gmail.com" && value.password === "admin2233"){
                    navigate('app/exposure')
                }else {
                    toast.error("User not found")
                }
        },[request])

    return (
      <Routes>
        <Route path={Pages.Login} element={<AuthContainer onsubmit={(value:any)=>onSubmit(value)}/>}/>
        <Route path={Pages.App} element={<AppContainer />}>
            <Route path={RouteContainerTabs.Exposure} element={<ExposureContainer/>}/>
            <Route path={RouteContainerTabs.Article} element={<ArticleContainer/>}/>
            <Route path={RouteContainerTabs.Qualification} element={<QualificationContainer/>}/>
            <Route path={RouteContainerTabs.IndependentWork} element={<IndependentWorkContainer/>}/>
            <Route path={RouteContainerTabs.PracticalWork} element={<PracticalContainer/>}/>
            <Route path={RouteContainerTabs.Image} element={<ImagesContainer/>}/>
            <Route path={RouteContainerTabs.MyInformation} element={<MyInformationContainer/>}/>
            <Route path={RouteContainerTabs.DGU} element={<DGUContainer/>}/>
        </Route>
      </Routes>
)
}