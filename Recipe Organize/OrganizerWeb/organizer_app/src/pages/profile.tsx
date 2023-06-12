import LayoutMaster from "@/components/LayoutMaster";
import EditProfileContent from "@/components/profile/EditProfileContent";
import LeftBarProfile from "@/components/profile/LeftBarProfile";
import { ApiGetCookerByUsername } from "@/services/CookerService";
import { ApiGetCustomerByUsername } from "@/services/CustomerService";
import { ApiGetEmployeeByUsername } from "@/services/EmployeeService";
import { Cooker, Customer, Employee, UserInfoCookie } from "@/types";
import { GetServerSideProps } from "next";
type Params = {
    customerData?: Customer,
    cookerData?: Cooker,
    employeeData?: Employee,
}
const Page = ({customerData, cookerData, employeeData}: Params) => {
    return(
        <LayoutMaster>
            <div className="pe-5">
                <div className="row pe-5">
                    <div className="col-3">
                        <LeftBarProfile itemActive={1} cookerActive={cookerData && cookerData.status}/>
                    </div>
                    <div className="col-9 px-5 pt-5 mb-5">
                        <div className="p-5" style={{backgroundColor:'lightyellow',borderRadius:20,border:'1px solid lightgray'}}>
                            <EditProfileContent customer={customerData} cooker={cookerData} employee={employeeData} />
                        </div>
                    </div>
                </div>
            </div>
        </LayoutMaster>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params, req, res } = context;

    const { userInfoCookie } = req.cookies;
    var userCookie = null;

    if(userInfoCookie){
        userCookie = JSON.parse(userInfoCookie) as UserInfoCookie;
    }
    // REDIRECT TO HOME
    if (userCookie === null) {
        res.writeHead(302, { Location: "../" });
        res.end();
        return { props: {} };
    }
    var cookerData = null;
    var employeeData = null;
    var customerData = null;
    const role = userCookie.userInfo.role.roleName;
    if(role=='Cooker'){
        cookerData = await ApiGetCookerByUsername(userCookie.userInfo.username) as Cooker;
    }else if(role=='Customer'){
        customerData = await ApiGetCustomerByUsername(userCookie.userInfo.username) as Customer;
    }else{
        employeeData = await ApiGetEmployeeByUsername(userCookie.userInfo.username) as Employee;
    }

    return { 
        props: { 
            customerData,
            cookerData,
            employeeData,
        } 
    };
};


export default Page;