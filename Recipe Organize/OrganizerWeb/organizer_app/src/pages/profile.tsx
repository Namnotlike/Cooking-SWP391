import LayoutMaster from "@/components/LayoutMaster";
import EditProfileContent from "@/components/profile/EditProfileContent";
import LeftBarProfile from "@/components/profile/LeftBarProfile";
import { ApiGetCustomerByUsername } from "@/services/CustomerService";
import { Customer } from "@/types";
import { GetServerSideProps } from "next";
type Params = {
    customerData: Customer,
}
const Page = ({customerData}: Params) => {
    return(
        <LayoutMaster>
            <div className="px-5 mt-3">
                <div className="row p-5">
                    <div className="col-3">
                        <LeftBarProfile />
                    </div>
                    <div className="col-9 px-5">
                        <div className="px-5">
                            <EditProfileContent customer={customerData}/>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutMaster>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params, query } = context;
    const {user} = query;
    const username = user as string;
    const customerData = await ApiGetCustomerByUsername(username) as Customer;
    return { 
        props: { 
            customerData
        } 
    };
};


export default Page;