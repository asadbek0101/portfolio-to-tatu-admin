import { useLocation, useNavigate } from "react-router-dom";
import { Pages, RouteContainerTabs } from "../../constants/Routes";
import AppMenu from "./AppMenu";
import "./assets/app-menu.scss";
import SideBarItem from "./SideBarItem";
import { useCallback } from "react";
import RoleIcon from "../icons/RoleIcon";
import MenuIcon from "../icons/MenuIcon";
import BoxsIcon from "../icons/BoxsIcon";
import BookIcon from "../icons/BookIcon";
import UserIcon from "../icons/UserIcon";
import NewsIcon from "../icons/NewsIcon";

export default function SideBarMenu(){

    const navigate = useNavigate();

    const location = useLocation();

    const formatter = useCallback((path: string) =>{
        let _C = path.lastIndexOf('/'), l = path.indexOf("?");
        
        return l>0? path.substring(_C+1, l) : path.substring(_C+1);
    },[])

    return (
        <AppMenu
            activeTab={formatter(location.pathname)}
            defaultTab={RouteContainerTabs.Exposure}
            onChangeTab={((value: any)=>navigate(`${Pages.App}/${value}`))}
            >
            <SideBarItem
                key={RouteContainerTabs.Exposure}    
                icon={<RoleIcon color="white"/>}       
                >
                Maruzalar
              </SideBarItem>
            <SideBarItem
                key={RouteContainerTabs.Article}   
                icon={<BoxsIcon color="white"/>}       
                >
                Maqolalar
              </SideBarItem>
            <SideBarItem
                key={RouteContainerTabs.Qualification}     
                icon={<BookIcon color="white"/>}       
                >
                Sertifikatlar
              </SideBarItem>
            <SideBarItem
                key={RouteContainerTabs.IndependentWork}           
                icon={<BookIcon color="white"/>}       
                >
                Mustaqil ishlar
              </SideBarItem>
            <SideBarItem
                key={RouteContainerTabs.PracticalWork}           
                icon={<NewsIcon color="white"/>}       
                >
                Amaliy ishlar
              </SideBarItem>
            <SideBarItem
                key={RouteContainerTabs.Image}           
                icon={<UserIcon color="white"/>}       
                >
                Rasmlar
              </SideBarItem>
            <SideBarItem
                key={RouteContainerTabs.MyInformation}           
                icon={<RoleIcon color="white"/>}       
                >
                Mening malumotlarim
            </SideBarItem>
            <SideBarItem
                key={RouteContainerTabs.DGU}           
                icon={<UserIcon color="white"/>}       
                >
                DGU
            </SideBarItem>
        </AppMenu>
        
    )
}