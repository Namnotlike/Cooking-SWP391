import React from "react";
import BarItem from "./BarItem";

type Params = {
    dataArray: Array<{
        value: number;
        legend: string;
      }>;
};

const BarGraph = ({dataArray}: Params) => {
    const barItems = React.useMemo(() => {
        let highestValue = 0;
    
        // get the highest value
        dataArray.forEach(({ value }) => {
          highestValue = Math.max(highestValue, value);
        });
    
        // calculate "barPercentage" using the "highestValue" to construct the bar items
        return dataArray.map((item) => ({
          legend: item.legend,
          barPercentage: `${Math.round((item.value / highestValue) * 100)}%`,
          value: item.value,
        }));
      }, [dataArray]);

    return (
      <div className="bar-graph">
          <div className="bars-list">
              {barItems.map((barItem, idx) => (
              <BarItem
                  key={idx}
                  legend={barItem.legend}
                  barPercentage={barItem.barPercentage}
                  value={barItem.value}
              />
              ))}
          </div>
          <div className="bars-line" />
          <div className="mt-5">
            <div className="d-flex align-items-center">
              <div style={{width:20, height:20, backgroundColor: '#54d6da', border:'2px solid white'}} />
              <span className="ms-3">Views of recipe</span>
            </div>
              <h3 className="text-center text-secondary">Recipe view statistic chart</h3>
          </div>
      </div>
    );
};

export default BarGraph;