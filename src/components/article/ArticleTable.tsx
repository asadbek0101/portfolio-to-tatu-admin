import TableButton from "../button/TableButton";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import Table, { HeaderProps } from "../table/Table";

interface Props{
    readonly data: any[];
    readonly delet: (value: any) => void;
    readonly select: (value: any) => void;
}

export default function ArticleTable({
    data,
    delet,
    select
}:Props){
    const headers: HeaderProps[] = [
        {
            width: 40,
            header: "ID",
            access: "id"
        },
        {
            width: 200,
            header: "Title",
            access: "title"
        },
        {
            width: 100,
            header: "Actions",
            access: "actions",
            ceil: (row: any)=>{
                return (
                            <div className="d-flex gap-2">
                            <TableButton
                                className="bg-warning"
                                onClick={()=>select(row)}
                                >
                                <EditIcon color="white" size={14}/>
                            </TableButton>
                            <TableButton
                                className="bg-danger"
                                onClick={()=>delet(row)}
                                >
                                <DeleteIcon color="white" size={14}/>
                            </TableButton>
                            </div>
                        )
            },
        },
    ]
    return (<Table 
                    data={data} 
                    headers={headers}/>)
}