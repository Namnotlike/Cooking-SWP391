import { Report } from "@/types";
import * as DatetimeUtils from "@/utils/DatetimeUtils"
import React from "react";
import Pagination from "./Pagination";
type Params = {
  reports: Report[]
  handleClickRowTable: (item: Report)=>void,
  handleChangePage: (page: number)=>void,
  totalItem: number,
}


const TableReport = ({reports, handleClickRowTable, handleChangePage, totalItem}: Params) => {
  const [currentPage,setCurrentPage] = React.useState(1);
  const [indexSelected,setIndexSelected] = React.useState(-1);
  const handleClickRow = (row: Report,index: number) => {
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
            <th scope="col" className="th-orange">Reason</th>
            <th scope="col" className="th-orange">Recipe Name</th>
            <th scope="col" className="th-orange">Status</th>
            <th scope="col" className="th-orange">Create At</th>
          </tr>
        </thead>
        <tbody>
          {reports && reports.map((row,index)=>(
            <tr key={index} style={{backgroundColor: indexSelected == index && 'lightyellow' || 'white'}} onClick={()=>handleClickRow(row,index)}>
              <th scope="row">{row.id}</th>
              <td>{row.reason}</td>
              <td>{row.dish.dishName}</td>
              <td>{row.dish.status}</td>
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

export default TableReport;