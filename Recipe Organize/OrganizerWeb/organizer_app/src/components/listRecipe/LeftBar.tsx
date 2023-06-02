import { Category } from "@/types";
import Collapse from "./Collapse";

type Params = {
    categories: Category[],
}
const LeftBar = ({categories}:Params) => {
    return (
        <div>
            <h1>Recipes</h1>
            {categories.map((row,index)=>(
                <Collapse key={index} label={row.name} categoryDetails={row.categoryDetails}/>
            ))}
        </div>
    );
};

export default LeftBar;