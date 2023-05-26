import { ReactNode } from "react";
import TopBar from "./TopBar";
import Footer from "./Footer";

type Params = {
    children: ReactNode,
}

const LayoutMaster = ({children}: Params) => {
    return (
        <div style={{position:'relative'}} className="p-0 m-0">
          <TopBar />
          <div style={{minBlockSize:600,backgroundColor:'white'}} className="p-0 m-0">
            {children}
          </div>
          <Footer />
        </div>
    )
};

export default LayoutMaster;