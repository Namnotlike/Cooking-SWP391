
const OptInput = () => {

    const inputStyle = {
        width:50,
        heigt:50,
        marginRight:10,
        textAlign: 'center' as any,
    };

    const handleClickInput = () => {
        for(let i = 1; i <= 6; i++){
            const item = (document.getElementById("digit"+i) as HTMLInputElement);
            if(item.value.trim()!=''){
                return;
            }
        }
        (document.getElementById("digit1") as HTMLInputElement).focus();
    };
    const handleChangeInput = (index: number) => {
        for(let i = 1; i <= 6; i++){
            const item = (document.getElementById("digit"+i) as HTMLInputElement);
            if(item.value.trim().length>1){
                item.value = item.value.trim()[0];
            }
        }
        if(index<6){
            const item = (document.getElementById("digit"+(index+1)) as HTMLInputElement);
            const itemCurrent = (document.getElementById("digit"+(index)) as HTMLInputElement);
            if(item.value.trim() == '' && itemCurrent.value.trim() != ''){
                item.focus();
                return;
            }
        }
    };
   
    return (
        <div className="d-flex">            
            <input type="number" className="form-control" style={inputStyle} id="digit1" onClick={handleClickInput} onChange={()=>handleChangeInput(1)} required/>
            <input type="number" className="form-control" style={inputStyle} id="digit2" onClick={handleClickInput} onChange={()=>handleChangeInput(2)} required/>
            <input type="number" className="form-control" style={inputStyle} id="digit3" onClick={handleClickInput} onChange={()=>handleChangeInput(3)} required/>
            <input type="number" className="form-control" style={inputStyle} id="digit4" onClick={handleClickInput} onChange={()=>handleChangeInput(4)} required/>
            <input type="number" className="form-control" style={inputStyle} id="digit5" onClick={handleClickInput} onChange={()=>handleChangeInput(5)} required/>
            <input type="number" className="form-control" style={inputStyle} id="digit6" onClick={handleClickInput} onChange={()=>handleChangeInput(6)} required/>
        </div>
    );
};

export default OptInput;