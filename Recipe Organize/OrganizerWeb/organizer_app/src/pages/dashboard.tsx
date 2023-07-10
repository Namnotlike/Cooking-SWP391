import { IMAGE_PATH } from "@/common/constant";
import LayoutMaster from "@/components/LayoutMaster";
import LeftBarProfile from "@/components/profile/LeftBarProfile";
import { ApiGetCookerByDishCountDesc, ApiGetCookerByKeySearch } from "@/services/CookerService";
import { Cooker, JsonBody, MonthView, UserInfoCookie } from "@/types";
import SearchIcon from '@mui/icons-material/Search';
import { GetServerSideProps } from "next/types";
import React, { ChangeEvent, FormEvent } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import BarItem from "@/components/BarItem";
import BarGraph from "@/components/BarGraph";
import CookerRankIcon from "@/components/CookerRankIcon";
import ShowDialog from "@/components/ShowDialog";
import { ApiGetViewedByDay, ApiGetViewedByYear } from "@/services/ViewedService";
type Params = {
    viewedData: MonthView[],
    cookerData: Cooker[], 
    cookerDishCount: Cooker[], 
}



const Page = ({viewedData, cookerData, cookerDishCount}: Params) => {
    const [cookers,setCookers] = React.useState<Cooker[] | null>(cookerData);
    const [cookerTop10, setCookerTop10] = React.useState(cookerDishCount);
    const handleDragStart = (e: any) => e.preventDefault();

    const [dataChart, setDataChart] = React.useState(viewedData);

    const [openDialog, setOpenDialog] = React.useState(false);
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);
    const [messageDialog, setMessageDialog] = React.useState("");
    const [titleDialog, setTileDialog] = React.useState("");
    const [typeDialog, setTypeDialog] = React.useState("");

    const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const keysearch = event.currentTarget.keysearch.value.trim();
        if(!keysearch){
            setCookers(cookerData);
            return;
        }
        const result = await ApiGetCookerByKeySearch(keysearch,1,12);
        if(result && result.code=='01'){
            if(result.data.length>0){
                setCookers(result.data);
                return;
            }
            setMessageDialog("Couldn't find any cookers with keyword: "+keysearch);
            setTileDialog("Notice");
            setTypeDialog('info')
            handleOpenDialog();
        }
    }

    const items = [
        <div className="row pe-5 py-2">
            {cookers && cookers.slice(0,6).map((row, index)=>(
                <div className='col-2'  key={index} onClick={()=>{location.href="../search?cooker="+row.id}}>
                    <div className='bg-lightgray p-5 hover_bg_yellow' style={{border:'1px solid lightgray',borderRadius:15}}>
                        <div className="d-flex justify-content-center">
                            <LazyLoadImage className="img-fit" src={IMAGE_PATH+row.imageUrl+".png"} style={{width:60,height:60,borderRadius:'50%'}} alt="Picture of the author"/>
                        </div>
                        <p className="fw-bold text-center mt-3" >{row.fullName}</p>
                        <p className="mt-3 text-center">Cooker <CookerRankIcon rank={row.rank} /></p>
                    </div>
                </div>
            ))}
        </div>,
        <div className="row">
            {cookers && cookers.slice(6,12).map((row, index)=>(
                <div className='col-2'  key={index} onClick={()=>{location.href="../search?cooker="+row.id}}>
                    <div className='bg-lightgray p-5 hover_bg_yellow' style={{border:'1px solid lightgray',borderRadius:15}}>
                        <div className="d-flex justify-content-center">
                            <LazyLoadImage className="img-fit" src={IMAGE_PATH+row.imageUrl+".png"} style={{width:60,height:60,borderRadius:'50%'}} alt="Picture of the author"/>
                        </div>
                        <p className="fw-bold text-center mt-3" >{row.fullName}</p>
                        <p className="mt-3 text-center">Cooker <CookerRankIcon rank={row.rank}/></p>
                    </div>
                </div>
            ))}
        </div>,
        <div className="row">
            {cookers && cookers.slice(12,18).map((row, index)=>(
                <div className='col-2'  key={index} onClick={()=>{location.href="../search?cooker="+row.id}}>
                    <div className='bg-lightgray p-5 hover_bg_yellow' style={{border:'1px solid lightgray',borderRadius:15}}>
                        <div className="d-flex justify-content-center">
                            <LazyLoadImage className="img-fit" src={IMAGE_PATH+row.imageUrl+".png"} style={{width:60,height:60,borderRadius:'50%'}} alt="Picture of the author"/>
                        </div>
                        <p className="fw-bold text-center mt-3" >{row.fullName}</p>
                        <p className="mt-3 text-center">Cooker <CookerRankIcon rank={row.rank}/></p>
                    </div>
                </div>
            ))}
        </div>,
    ]   
 

    const handleChangeCondition = async (event: ChangeEvent<HTMLSelectElement>) => {
        var result = null;
        if(event.currentTarget.value=='1'){
            result = await ApiGetViewedByYear();
        }else{
            result = await ApiGetViewedByDay();
        }
        if(result && result.code=='01'){
            setDataChart(result.data);
        }
    }

    return(
        <LayoutMaster>
            <div>
                <div className="row">
                    <div className="col-3">
                        <LeftBarProfile cookerActive={false} itemActive={10}/>
                    </div>
                    <div className="col-9">
                        <h3 className="color-orange mt-5 mb-3">ADMIN DASHBOARD</h3>
                        <form onSubmit={handleSearch}>
                            <div className='d-flex justify-content-start'>
                                <div className='d-flex justify-content-center bg-white p-2 px-4' style={{borderRadius:15,boxShadow:'5px 5px 5px 5px lightgray'}}>
                                    <SearchIcon style={{color:'gray'}}/>
                                    <input type='text' placeholder='Search cookers' id="keysearch" className='px-2' style={{border:'none',outline:'none'}} />
                                </div>
                            </div>
                        </form>
                        <div className="my-3"></div>
                        <AliceCarousel mouseTracking items={items} />
                        {/* <ColumnChart /> */}
                        <div className="row">
                            <div className="container bg-lightgray col-8 p-5 mb-5" style={{height:600, borderRadius:15}}>
                                <div className="d-flex justify-content-end mb-3">
                                    <select className="form-select ws-200" onChange={(event)=>handleChangeCondition(event)}>
                                        <option value='1'>In year 2023</option>
                                        <option value='2'>Last 7 days</option>
                                    </select>
                                </div>
                                <BarGraph dataArray={dataChart} />
                            </div>
                            <div className="col-4 px-3">
                                <div className="" style={{borderRadius:15}}>
                                    <div className="d-flex align-items-center p-2">
                                        <h3>Cooker</h3>
                                        <div className="flex-grow-1"></div>
                                        <div className="d-flex justify-content-center align-items-center" style={{width:30, height:30, border:'1px solid black', borderRadius:'50%'}}>
                                            <b>{cookerData && cookerData.length}</b>
                                        </div>
                                    </div>
                                    <hr />
                                    {cookerTop10 && cookerTop10.map((row, index)=>(
                                        <div key={index} className="d-flex align-items-center p-3 hover_bg_yellow" onClick={()=>{location.href="../search?cooker="+row.id}}>
                                            <LazyLoadImage className="img-fit" src={IMAGE_PATH+row.imageUrl+".png"} style={{width:60,height:60,borderRadius:'50%'}} alt="Picture of the author"/>
                                            <p className="ms-3"><b>{row.fullName}</b> <CookerRankIcon rank={row.rank} /></p>
                                            <div className="flex-grow-1"></div>
                                            <span>{row.dishCount} recipes</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            <ShowDialog 
                content={messageDialog}
                title={titleDialog}
                type={typeDialog}
                buttonOk={true}
                open={openDialog}
                setOpen={setOpenDialog}
            />
        </LayoutMaster>
    );
};


export const getServerSideProps: GetServerSideProps = async(context) => {
    const { params,query, req, res } = context;
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

    const resultCooker = await ApiGetCookerByKeySearch("") as JsonBody;

    const cookerDishCountData = await ApiGetCookerByDishCountDesc(1,5) as JsonBody;

    const viewedData = await ApiGetViewedByYear() as JsonBody;
    return { props: { 
        viewedData: viewedData.data,
        cookerData: resultCooker.data,
        cookerDishCount: cookerDishCountData.data
    } };
}

export default Page;