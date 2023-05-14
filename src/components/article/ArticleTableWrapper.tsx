import { useCallback, useEffect, useState } from "react";
import Button from "../button/Button";
import TabPage from "../tabs/TabPage";
import { request } from "../../api/request";
import { toast } from "react-toastify";
import ArticleTable from "./ArticleTable";

interface Props{
    readonly create: () => void;
    readonly select: (value: any) => void;
}

export default function ArticleTableWrapper({
    create,
    select
}:Props){

    const [data, setData] = useState([]);

    useEffect(()=>{
        request.get(`/article-limit/getAll/${0}`).then((response: any)=>{
            setData(response.data.data)
        }).catch((error: any)=>console.log(error))
    },[request, setData]);

    const delet = useCallback((value: any)=>{
            request.delete(`/article/delete/${value.id}`)
            .then(()=>{
                toast.success("Article has delete successfully")
                window.location.reload();
            }).catch((error: any)=>toast.error("Something error"))
    },[request])

    return (
        <TabPage
            headerComponent={
                <Button
                    onClick={create}
                    className="bg-warning text-light px-3 py-1"
                    >
                    Create New
                </Button>
            }
            childrenClassName="p-3"
            >   
            <ArticleTable
                 data={data}
                 delet={delet}
                 select={select}
                 />
        </TabPage>
    )
}