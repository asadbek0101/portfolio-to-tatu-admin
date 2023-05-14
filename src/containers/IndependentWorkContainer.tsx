import { useSearchParams } from "react-router-dom";
import ContainerLayout from "../components/app/ContainerLayout";
import { useMemo } from "react";
import { ContainerTabs } from "../constants/Routes";
import ExposureTableWrapper from "../components/exposure/ExposureTableWrapper";
import ExposureFormWrapper from "../components/exposure/ExposureFormWrapper";
import IndependentWorkTableWrapper from "../components/independent work/IndependentWorkTableWrapper";
import IndependentWorkFormWrapper from "../components/independent work/IndependentWorkFormWrapper";

export default function IndependentWorkContainer(){

    const [search, setSearch] = useSearchParams();
    const tabType = useMemo(()=>search.get("pageType")?search.get("pageType"): ContainerTabs.Table, [search])

    return (
        <ContainerLayout>
            {tabType === ContainerTabs.Table && (
                <IndependentWorkTableWrapper
                    create={()=>{
                        setSearch({pageType: ContainerTabs.Form})
                    }}
                    select={(value: any)=>{
                        setSearch({pageType: ContainerTabs.Form, independentWorkId: value.id})
                    }}
                    />
            )}
            {tabType === ContainerTabs.Form && (
                <IndependentWorkFormWrapper
                    back={()=>{
                        setSearch({pageType: ContainerTabs.Table})
                    }}
                    />
            )}
        </ContainerLayout>
    )
}