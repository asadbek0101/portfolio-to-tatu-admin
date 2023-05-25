import { useCallback, useState } from "react";
import { request } from "../../api/request";

interface Props{
    readonly setImage: (value: any) => void;
    readonly className?: string;
}

export default function PDFUpload({
    setImage,
    className
}:Props){

    const handleChange = (value: any) => {
        const formDate = new FormData();
        for(let i = 0; i<value.target.files.length; i++){
            formDate.append(`picture`, value.target.files[i])
        }
        fetch(`https://jarvis-jon.uz:8443/api/v1/file/upload`,{
            method: "POST",
            body: formDate
        }).then((response: any)=>response.json())
        .then((data: any)=>{
            setImage(data.data)
        })
        .catch((error: any)=>console.log(error))
    }

    return (
        <div className={`upload-container w-100 ${className}`}>
            <input id="PDFUpload" className="hidden" type="file" hidden onChange={(event: any) => handleChange(event)} />
            <label className="upload-label" htmlFor="PDFUpload">Upload PDF</label>
        </div>
    )
}