import { Category } from "@/types";
import Collapse from "./Collapse";

type Params = {
    categories: Category[],
}
const LeftBar = ({categories}:Params) => {
    return (
        <div>
            {categories.map((row,index)=>(
                <Collapse key={index} label={row.name} categoryDetails={row.categoryDetails}/>
            ))}
        </div>
    );
};

export default LeftBar;