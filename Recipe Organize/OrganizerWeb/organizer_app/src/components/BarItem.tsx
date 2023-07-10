
type Params = {
    legend: string,
    barPercentage: string;
    value: number,
}

const BarItem = ({legend, barPercentage, value}: Params) => {
    return (
        <div className="bar-item" style={{ height: barPercentage }}>
            <div className="bar-item-legend">{legend}</div>
            {barPercentage != '0%' && (<p className="text-center" style={{marginTop:'-22px'}}>{value}</p>)}
        </div>
    );
};

export default BarItem;