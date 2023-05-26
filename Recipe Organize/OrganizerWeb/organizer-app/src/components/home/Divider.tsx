type Params = {
    label: string,
}

const Divider = ({label}: Params) => {
    return (
        <div className="d-flex justify-content-center my-3">
            <div className="text-center" style={{border:'none',borderBottom:'1px solid black',width:500}}>
                <p style={{fontSize:32}} className="my-2 p-0"><b>{label}</b></p>
            </div>
        </div>
    );
}

export default Divider;