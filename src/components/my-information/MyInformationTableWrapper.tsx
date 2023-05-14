import { useCallback, useEffect, useState } from "react";
import Button from "../button/Button";
import TabPage from "../tabs/TabPage";
import { request } from "../../api/request";
import { toast } from "react-toastify";
import MyInformationTable from "./MyInformationTable";

interface Props{
    readonly create: () => void;
    readonly select: (value: any) => void;
}

export default function MyInformationTableWrapper({
    create,
    select
}:Props){

    const [data, setData] = useState([]);

    useEffect(()=>{
        request.get(`/my-information/getAll/${0}`).then((response: any)=>{
            setData(response.data.data)
        }).catch((error: any)=>console.log(error))
    },[request, setData]);

    const delet = useCallback((value: any)=>{
            request.delete(`/my-information/delete/${value.id}`)
            .then(()=>{
                toast.success("My Information has delete successfully")
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
            <MyInformationTable
                 data={data}
                 delet={delet}
                 select={select}
                 />
        </TabPage>
    )
}