import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import ContainerLayout from "../components/app/ContainerLayout";
import { ContainerTabs } from "../constants/Routes";
import QualificationTableWrapper from "../components/qualification/QualificationTableWrapper";
import QualificationFormWrapper from "../components/qualification/QualificationFormWrapper";

export default function QualificationContainer(){

    const [search, setSearch] = useSearchParams();
    const tabType = useMemo(()=>search.get("pageType")?search.get("pageType"): ContainerTabs.Table, [search])

    return (
        <ContainerLayout>
            {tabType === ContainerTabs.Table && (
                <QualificationTableWrapper
                    create={()=>{
                        setSearch({pageType: ContainerTabs.Form})
                    }}
                    select={(value: any)=>{
                        setSearch({pageType: ContainerTabs.Form, qualificationId: value.id})
                    }}
                    />
            )}
            {tabType === ContainerTabs.Form && (
                <QualificationFormWrapper
                    back={()=>{
                        setSearch({pageType: ContainerTabs.Table})
                    }}
                    />
            )}
        </ContainerLayout>
    )
}