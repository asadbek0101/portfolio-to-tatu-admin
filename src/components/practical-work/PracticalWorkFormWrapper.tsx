import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../button/Button";
import TabPage from "../tabs/TabPage";
import ExposureForm from "./PracticalWorkForm";
import { useEffect, useMemo } from "react";
import { request } from "../../api/request";
import { toast } from "react-toastify";
import { ContainerTabs } from "../../constants/Routes";

interface Props{
    readonly back: () => void;
}

export default function PracticalWorkFormWrapper({
    back,
}:Props){

    const [initialValues, setInitialValues] = useState({
        title: "",
        content: "",
        description: "",
        img: "",
        generateName: "",
    })
    const [search, setSearch] = useSearchParams();

    const ID = useMemo(()=>search.get("practicalWorkId")?Number(search.get("practicalWorkId")):"",[])

    useEffect(()=>{
        if(ID !== ""){
            request.get(`/practical-work/get/${ID}`)
            .then((response: any)=>{
                setInitialValues(response.data.data)
            }).catch((error: any)=>{
                console.log(error)
            })
        }
    },[ID, request, setInitialValues])

    const onSubmit = useCallback((value: any)=>{
        if(ID !== ""){
            const data = {
                ...value,
                id: ID.toString(),
            }
            request.put(`/practical-work/update`, data)
        .then(()=>{
            toast.success("Practical Work has update successfully!")
            setSearch({pageType: ContainerTabs.Table})
        })
        .catch((error: any)=>console.log(error))
        }else{
        request.post(`/practical-work/create`, value)
        .then(()=>{
            toast.success("Practical Work has added successfully!")
            setSearch({pageType: ContainerTabs.Table})
        })
        .catch((error: any)=>console.log(error))
        }
    },[request])

    return (
        <TabPage
            headerComponent={
                <Button
                    onClick={back}
                    className="bg-warning text-light px-3 py-1"
                    >
                    Back
                </Button>
            }
            childrenClassName="p-3"
            >
           <ExposureForm
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                onsubmit={onSubmit}
                />
        </TabPage>
    )
}