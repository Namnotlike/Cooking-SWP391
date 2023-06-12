import { Cooker, Customer, Dish, Favorite } from "@/types";
import * as DatetimeUtils from "@/utils/DatetimeUtils"
import React from "react";
import Pagination from "./Pagination";
import * as Constant from '@/common/constant';

type Params = {
  cookers?: Cooker[],
  customers?: Customer[],
  handleClickRowTable: (item: Cooker)=>void,
  handleChangePage: (page: number)=>void,
  totalItem: number,
}

const TableUser = ({cookers, customers, handleClickRowTable, handleChangePage, totalItem}: Params) => {
  const [currentPage,setCurrentPage] = React.useState(1);
  const [indexSelected,setIndexSelected] = React.useState(-1);
  const handleClickRow = (row: any,index: number) => {
    setIndexSelected(index);
    // console.log(row);
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
            <th scope="col" className="th-orange">FullName</th>
            <th scope="col" className="th-orange">Phone</th>
            <th scope="col" className="th-orange">Username</th>
            <th scope="col" className="th-orange">Email</th>
            <th scope="col" className="th-orange">Create At</th>
          </tr>
        </thead>
        <tbody style={{border:"2px solid lightgray"}}>
            {cookers && cookers.map((row,index)=>(
               <tr key={index} style={{backgroundColor: indexSelected == index && 'lightyellow' || 'white'}} onClick={()=>handleClickRow(row,index)}>
                <th scope="row">{row.id}</th>
                <td>{row.fullName}</td>
                <td>{row.phone}</td>
                <td>{row.account.username}</td>
                <td>{row.account.email}</td>
                <td>{DatetimeUtils.formatDate(row.createAt)}</td>
              </tr>
            ))}
            {customers && customers.map((row,index)=>(
               <tr key={index} style={{backgroundColor: indexSelected == index && 'lightyellow' || 'white'}} onClick={()=>handleClickRow(row,index)}>
                <th scope="row">{row.id}</th>
                <td>{row.fullName}</td>
                <td>{row.phone}</td>
                <td>{row.account.username}</td>
                <td>{row.account.email}</td>
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

export default TableUser;