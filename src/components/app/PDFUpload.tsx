import { useCallback } from "react";

interface Props{
    readonly setImage: (value: any) => void;
    readonly className?: string;
}

export default function PDFUpload({
    setImage,
    className
}:Props){


    const convertBase64 = useCallback((e: any) => {
        console.log(e.target.value)
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = ( ) => {
            setImage(reader.result?.toString());
        }

        reader.readAsDataURL(file);
    },[setImage])

    return (
        <div className={`upload-container w-100 ${className}`}>
            <input id="PDFUpload" className="hidden" type="file" hidden onChange={(event: any) => convertBase64(event)} />
            <label className="upload-label" htmlFor="PDFUpload">Upload PDF</label>
        </div>
    )
}