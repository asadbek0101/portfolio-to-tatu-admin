import { useSearchParams } from "react-router-dom";
import ContainerLayout from "../components/app/ContainerLayout";
import { useMemo } from "react";
import { ContainerTabs } from "../constants/Routes";
import MyInformationTableWrapper from "../components/my-information/MyInformationTableWrapper";
import MyInformationFormWrapper from "../components/my-information/MyInformationFormWrapper";

export default function MyInformationContainer(){

    const [search, setSearch] = useSearchParams();
    const tabType = useMemo(()=>search.get("pageType")?search.get("pageType"): ContainerTabs.Table, [search])

    return (
        <ContainerLayout>
            {tabType === ContainerTabs.Table && (
                <MyInformationTableWrapper
                    create={()=>{
                        setSearch({pageType: ContainerTabs.Form})
                    }}
                    select={(value: any)=>{
                        setSearch({pageType: ContainerTabs.Form, myInformationId: value.id})
                    }}
                    />
            )}
            {tabType === ContainerTabs.Form && (
                <MyInformationFormWrapper
                    back={()=>{
                        setSearch({pageType: ContainerTabs.Table})
                    }}
                    />
            )}
        </ContainerLayout>
    )
}