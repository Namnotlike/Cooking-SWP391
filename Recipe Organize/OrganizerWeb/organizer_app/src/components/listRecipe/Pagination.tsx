import { Button } from "@mui/material";

type Params = {
    totalItem: number, 
    itemPerPage: number, 
    indexActive: number,
    urlCurrent: string,
}

const Pagination = ({totalItem, itemPerPage, indexActive, urlCurrent}:Params) => {
    const totalPage = Math.ceil(totalItem / itemPerPage);
    const styleButton = (index: number) => {
        return {
            inlineSize:40,
            blockSize:40,
            padding:0,
            border:'1px solid green',
            backgroundColor: index==indexActive && 'green' || 'white',
            color: index==indexActive && 'white' || 'green'
        }
    }
    if(totalPage==1){
        return(<></>)
    }
    const renderButtons = () => {
        const buttons = [];
        var indexStart = 3;
        if(indexActive>3 && indexActive<totalPage-3){
            indexStart = indexActive;
        }

        for (let i = (indexStart-2); i <= totalPage; i++) {
            if(totalPage>10 && i>(indexStart-2)+4 && i<totalPage-5){
                buttons.push(
                    <span key={i} className="me-1 d-flex justify-content-center align-items-center hover_cursor" style={styleButton(i)} onClick={()=>{location.href=urlCurrent+"?page="+i}}>
                        ...
                    </span>
                );
                i=totalPage-5;
            }else{
                buttons.push(
                    <span key={i} className="me-1 d-flex justify-content-center align-items-center hover_cursor" style={styleButton(i)} onClick={()=>{location.href=urlCurrent+"?page="+i}}>
                        {i}
                    </span>
                );
            }
        }
        return buttons;
    };

    return (
        <div className="d-flex justify-content-center">
            {renderButtons()}
        </div>
    );
};

export default Pagination;