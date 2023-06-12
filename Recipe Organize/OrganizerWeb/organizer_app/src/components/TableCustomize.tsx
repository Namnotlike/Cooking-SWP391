import { Dish, Favorite } from "@/types";
import * as DatetimeUtils from "@/utils/DatetimeUtils"
import React from "react";
import Pagination from "./Pagination";
type Params = {
  favorites: Favorite[]
  handleClickRowTable: (item: Favorite)=>void,
  handleChangePage: (page: number)=>void,
  totalItem: number,
}

const TableCustom = ({favorites, handleClickRowTable, handleChangePage, totalItem}: Params) => {
  const [currentPage,setCurrentPage] = React.useState(1);
  const [indexSelected,setIndexSelected] = React.useState(-1);
  const handleClickRow = (row: Favorite,index: number) => {
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
            <th scope="col" className="th-orange">Customize</th>
            <th scope="col" className="th-orange">Create At</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map((row,index)=>(
            <tr key={index} style={{backgroundColor: indexSelected == index && 'lightyellow' || 'white'}} onClick={()=>handleClickRow(row,index)}>
              <th scope="row">{row.dish.id}</th>
              <td>{row.dish.dishName}</td>
              <td><a href={"../dish/"+row.dish.url+"-"+row.dish.id}>{row.dish.url}</a></td>
              <td>{row.customize && "Customized" || "None"}</td>
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