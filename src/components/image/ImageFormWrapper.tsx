import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../button/Button";
import TabPage from "../tabs/TabPage";
import ExposureForm from "./ImageForm";
import { useEffect, useMemo } from "react";
import { request } from "../../api/request";
import { toast } from "react-toastify";
import { ContainerTabs } from "../../constants/Routes";
import ImageForm from "./ImageForm";

interface Props{
    readonly back: () => void;
}

export default function ImageFormWrapper({
    back,
}:Props){

    const [initialValues, setInitialValues] = useState({
        name: "",
        content: "",
        description: "",
        img: "",
        generateName: "",
    })
    const [search, setSearch] = useSearchParams();

    const ID = useMemo(()=>search.get("imgId")?Number(search.get("imgId")):"",[])

    useEffect(()=>{
        if(ID !== ""){
            request.get(`/photo/get/${ID}`)
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
                name: value.title,
            }
            request.put(`/photo/update`, data)
        .then(()=>{
            toast.success("Image has update successfully!")
            setSearch({pageType: ContainerTabs.Table})
        })
        .catch((error: any)=>console.log(error))
        }else{
            const data = {
                ...value,
                name: value.title
            }
        request.post(`/photo/create`, data)
        .then(()=>{
            toast.success("Image has added successfully!")
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
           <ImageForm
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                onsubmit={onSubmit}
                />
        </TabPage>
    )
}