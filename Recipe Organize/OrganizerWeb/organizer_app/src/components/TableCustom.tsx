import { Dish } from "@/types";
import * as DatetimeUtils from "@/utils/DatetimeUtils"
import React from "react";
import Pagination from "./Pagination";
type Params = {
  dishes: Dish[]
  handleClickRowTable: (item: Dish)=>void,
  handleChangePage: (page: number)=>void,
  totalItem: number,
}


const TableCustom = ({dishes, handleClickRowTable, handleChangePage, totalItem}: Params) => {
  const [currentPage,setCurrentPage] = React.useState(1);
  const [indexSelected,setIndexSelected] = React.useState(-1);
  const handleClickRow = (row: Dish,index: number) => {
    setIndexSelected(index);
    handleClickRowTable(row);
  }
  const handleChangePageMid = (page: number) => {
    setIndexSelected(-1);
    handleChangePage(page);
    setCurrentPage(page);
  }

  return(
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="th-orange">ID</th>
            <th scope="col" className="th-orange">Dish Name</th>
            <th scope="col" className="th-orange">URL</th>
            <th scope="col" className="th-orange">Create At</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((row,index)=>(
            <tr key={index} style={{backgroundColor: indexSelected == index && 'lightyellow' || 'white'}} onClick={()=>handleClickRow(row,index)}>
              <th scope="row">{row.id}</th>
              <td>{row.dishName}</td>
              <td><a href={"../dish/"+row.url+"-"+row.id}>{row.url}</a></td>
              <td>{DatetimeUtils.formatDate(row.createAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination 
        totalItem={totalItem}
        page={currentPage}
        handleChangePage={handleChangePageMid}
      />
    </div>
  );
};

export default TableCustom;