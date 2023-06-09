import { CategoryDetail } from '@/types';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import React from 'react';
type Params = {
    label: string,
    categoryDetails: CategoryDetail[],
}

const Collapse = ({label, categoryDetails}: Params) => {
    const [show,setShow] = React.useState(false);
    return (
        <>
            <div className='d-flex my-2 p-3 hover_cursor' onClick={()=>setShow(!show)}>
                <span className='fw-bold f-size-24'>{label}</span>
                <div className='flex-grow-1'></div>
                <AddIcon className='f-size-36 color-gray'/>
            </div>
            {show && (
                <div className='ps-5'>
                    {categoryDetails && categoryDetails.map((row,index)=>(
                        <p key={index} className='fw-bold f-size-18'><Link href={"/category/"+row.url+"-"+row.id} className='hover_cursor_orange' style={{textDecoration:'none'}}>{row.name}</Link></p>
                    ))}
                </div>
            )}
        </>
    );
};

export default Collapse;