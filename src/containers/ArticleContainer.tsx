import { useSearchParams } from "react-router-dom";
import ContainerLayout from "../components/app/ContainerLayout";
import { useMemo } from "react";
import { ContainerTabs } from "../constants/Routes";
import ExposureTableWrapper from "../components/exposure/ExposureTableWrapper";
import ExposureFormWrapper from "../components/exposure/ExposureFormWrapper";
import ArticleTableWrapper from "../components/article/ArticleTableWrapper";
import ArticleFormWrapper from "../components/article/ArticleFormWrapper";

export default function ArticleContainer(){

    const [search, setSearch] = useSearchParams();
    const tabType = useMemo(()=>search.get("pageType")?search.get("pageType"): ContainerTabs.Table, [search])

    return (
        <ContainerLayout>
            {tabType === ContainerTabs.Table && (
                <ArticleTableWrapper
                    create={()=>{
                        setSearch({pageType: ContainerTabs.Form})
                    }}
                    select={(value: any)=>{
                        setSearch({pageType: ContainerTabs.Form, articleId: value.id})
                    }}
                    />
            )}
            {tabType === ContainerTabs.Form && (
                <ArticleFormWrapper
                    back={()=>{
                        setSearch({pageType: ContainerTabs.Table})
                    }}
                    />
            )}
        </ContainerLayout>
    )
}