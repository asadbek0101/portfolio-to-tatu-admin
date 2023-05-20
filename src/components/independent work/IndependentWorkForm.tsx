import { useCallback } from "react";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import InputField from "../form/InputField";
import GroupBox from "../app/GroupBox";
import Button from "../button/Button";
import TextAreaField from "../form/TextAreaField";
import ImgUpload from "../app/ImgUpload";
import { update } from "immupdate";
import PDFUpload from "../app/PDFUpload";

interface Props{
    readonly initialValues: any,
    readonly setInitialValues: (value: any) => void;
    readonly onsubmit: (value: any) => void;
}

const validationSchema = object({
    title: string(),
    description: string(),
    content: string(),
})

export default function IndependentWorkForm({
    initialValues,
    setInitialValues,
    onsubmit
}:Props){

    const onChangeTitle = useCallback((value: any)=>{
        setInitialValues((prev: any) => update(prev, {
            title: value.target.value
        }))
    },[setInitialValues])

    const onChangeDescription = useCallback((value: any)=>{
        setInitialValues((prev: any) => update(prev, {
            description: value.target.value
        }))
    },[setInitialValues])

    const setUploadImg = useCallback((value: any)=>{
        setInitialValues((prev: any) => update(prev, {
            img: value
        }))
    },[setInitialValues])

    const setUploadPdf = useCallback((value: any)=>{
        setInitialValues((prev: any) => update(prev, {
            link: value
        }))
    },[setInitialValues])

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={()=>onsubmit(initialValues)}
            >
            {()=>(
                <Form>
                    <div className="row mt-3">
                        <div className="col-6">
                            <GroupBox
                                title="Mustaqil Ish Malumotlari"
                                >
                                <div className="row">
                                    <div className="col-12">
                                    <InputField
                                        label="Title"
                                        name="title"
                                        value={initialValues.title}
                                        onChange={(value: any)=>onChangeTitle(value)}
                                        />
                                    </div>
                                    <div className="col-12 mt-2">
                                    <TextAreaField
                                        label="Description"
                                        name="description"
                                        value={initialValues.description}
                                        onChange={(value: any)=>onChangeDescription(value)}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <ImgUpload
                                            className="w-100"
                                            setImage={(value: any)=>setUploadImg(value)}  
                                            />
                                    </div>
                                    <div className="col-12 pt-2 text-center">
                                        <img src={initialValues.img} width="50%" alt="" />
                                    </div>
                                </div>
                            </GroupBox>
                        </div>
                        <div className="col-6">
                            <GroupBox
                                title="PDF yuklash"
                                >
                                    <div className="row">
                                        <div className="col-12 mt-4">
                                            <PDFUpload
                                                setImage={(value: any)=>setUploadPdf(value)}
                                                />
                                        </div>
                                    </div>
                            </GroupBox>
                        </div>
                        <div className="col-12 mt-3">
                            <Button 
                                type="submit"
                                className="px-3 py-1 bg-warning text-light"
                                >
                                Submit
                            </Button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}