import { useSearchParams } from "react-router-dom";
import ContainerLayout from "../components/app/ContainerLayout";
import { useMemo } from "react";
import { ContainerTabs } from "../constants/Routes";
import ExposureTableWrapper from "../components/exposure/ExposureTableWrapper";
import ExposureFormWrapper from "../components/exposure/ExposureFormWrapper";
import PracticalWorkTableWrapper from "../components/practical-work/PracticalWorkTableWrapper";
import PracticalWorkFormWrapper from "../components/practical-work/PracticalWorkFormWrapper";

export default function PractiacalWorkContainer(){

    const [search, setSearch] = useSearchParams();
    const tabType = useMemo(()=>search.get("pageType")?search.get("pageType"): ContainerTabs.Table, [search])

    return (
        <ContainerLayout>
            {tabType === ContainerTabs.Table && (
                <PracticalWorkTableWrapper
                    create={()=>{
                        setSearch({pageType: ContainerTabs.Form})
                    }}
                    select={(value: any)=>{
                        setSearch({pageType: ContainerTabs.Form, practicalWorkId: value.id})
                    }}
                    />
            )}
            {tabType === ContainerTabs.Form && (
                <PracticalWorkFormWrapper
                    back={()=>{
                        setSearch({pageType: ContainerTabs.Table})
                    }}
                    />
            )}
        </ContainerLayout>
    )
}