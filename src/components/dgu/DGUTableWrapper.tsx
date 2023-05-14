import { useCallback, useEffect, useState } from "react";
import Button from "../button/Button";
import TabPage from "../tabs/TabPage";
import ExposureTable from "./DGUTable";
import { request } from "../../api/request";
import { toast } from "react-toastify";

interface Props{
    readonly create: () => void;
    readonly select: (value: any) => void;
}

export default function DGUTableWrapper({
    create,
    select
}:Props){

    const [data, setData] = useState([]);

    useEffect(()=>{
        request.get(`/dgu/getAll/${5}`).then((response: any)=>{
            setData(response.data.data)
        }).catch((error: any)=>console.log(error))
    },[request, setData]);

    const delet = useCallback((value: any)=>{
            request.delete(`/dgu/delete/${value.id}`)
            .then(()=>{
                toast.success("Exposure has delete successfully")
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
            <ExposureTable
                 data={data}
                 delet={delet}
                 select={select}
                 />
        </TabPage>
    )
}