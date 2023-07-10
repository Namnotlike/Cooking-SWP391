import { Dish, Notification } from "@/types";
import * as DatetimeUtils from "@/utils/DatetimeUtils"
import React from "react";
import Pagination from "./Pagination";
type Params = {
  notifications: Notification[],
  handleClickRowTable: (item: Notification)=>void,
  handleChangePage: (page: number)=>void,
  totalItem: number,
}

const TableNotification = ({notifications, handleClickRowTable,handleChangePage, totalItem}: Params) => {
  const [currentPage,setCurrentPage] = React.useState(1);
  const [indexSelected,setIndexSelected] = React.useState(-1);
  const handleClickRow = (row: Notification,index: number) => {
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
            <th scope="col" className="th-orange">Content</th>
            <th scope="col" className="th-orange">Create By</th>
            <th scope="col" className="th-orange">Create At</th>
            <th scope="col" className="th-orange">Status</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((row,index)=>(
            <tr key={index} style={{backgroundColor: indexSelected == index && 'lightyellow' || 'white'}} onClick={()=>handleClickRow(row,index)}>
              <th scope="row">{row.id}</th>
              <td>{row.content}</td>
              <td>{row.createBy && row.createBy.username || "" }</td>
              <td>{DatetimeUtils.formatDate(row.createAt)}</td>
              <td>{row.status}</td>
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

export default TableNotification;