import { useSearchParams } from "react-router-dom";
import ContainerLayout from "../components/app/ContainerLayout";
import { useMemo } from "react";
import { ContainerTabs } from "../constants/Routes";
import ExposureTableWrapper from "../components/exposure/ExposureTableWrapper";
import ExposureFormWrapper from "../components/exposure/ExposureFormWrapper";

export default function ExposureContainer(){

    const [search, setSearch] = useSearchParams();
    const tabType = useMemo(()=>search.get("pageType")?search.get("pageType"): ContainerTabs.Table, [search])

    return (
        <ContainerLayout>
            {tabType === ContainerTabs.Table && (
                <ExposureTableWrapper
                    create={()=>{
                        setSearch({pageType: ContainerTabs.Form})
                    }}
                    select={(value: any)=>{
                        setSearch({pageType: ContainerTabs.Form, exposureId: value.id})
                    }}
                    />
            )}
            {tabType === ContainerTabs.Form && (
                <ExposureFormWrapper
                    back={()=>{
                        setSearch({pageType: ContainerTabs.Table})
                    }}
                    />
            )}
        </ContainerLayout>
    )
}