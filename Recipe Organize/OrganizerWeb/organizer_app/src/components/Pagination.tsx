
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import * as Constant from '@/common/constant';
type Params = {
    totalItem: number,
    page: number,
    handleChangePage: (page: number) => void,
}

const Pagination = ({totalItem, page, handleChangePage}: Params) => {
    const rowPerPage = Constant.ITEM_PER_PAGE_TABLE;
    const totalPage = Math.ceil(totalItem/rowPerPage);

    return (
        <div className='d-flex justify-content-center align-items-center'>
            {page != 1 && (
                <div className='cursor-pointer'>
                    <ArrowBackIosIcon onClick={()=>handleChangePage(page-1)}/>
                </div>
            ) || (
                <div>
                    <ArrowBackIosIcon style={{color:'lightgray'}} />
                </div>
            )}
            <span className='me-4 ms-3'>{page}</span>
            {page != totalPage && totalPage != 0 && (
                 <div className='cursor-pointer'>
                    <ArrowForwardIosIcon onClick={()=>handleChangePage(page+1)}/>
                </div>
            ) || (
                <div>
                    <ArrowForwardIosIcon style={{color:'lightgray'}} />
                </div>
            )}
        </div>
    );
};

export default Pagination;