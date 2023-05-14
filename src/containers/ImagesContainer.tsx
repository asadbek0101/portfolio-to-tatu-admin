import { useSearchParams } from "react-router-dom";
import ContainerLayout from "../components/app/ContainerLayout";
import { useMemo } from "react";
import { ContainerTabs } from "../constants/Routes";
import ExposureFormWrapper from "../components/exposure/ExposureFormWrapper";
import ImageTableWrapper from "../components/image/ImageTableWrapper";
import ImageFormWrapper from "../components/image/ImageFormWrapper";

export default function ExposureContainer(){

    const [search, setSearch] = useSearchParams();
    const tabType = useMemo(()=>search.get("pageType")?search.get("pageType"): ContainerTabs.Table, [search])

    return (
        <ContainerLayout>
            {tabType === ContainerTabs.Table && (
                <ImageTableWrapper
                    create={()=>{
                        setSearch({pageType: ContainerTabs.Form})
                    }}
                    select={(value: any)=>{
                        setSearch({pageType: ContainerTabs.Form, imageId: value.id})
                    }}
                    />
            )}
            {tabType === ContainerTabs.Form && (
                <ImageFormWrapper
                    back={()=>{
                        setSearch({pageType: ContainerTabs.Table})
                    }}
                    />
            )}
        </ContainerLayout>
    )
}