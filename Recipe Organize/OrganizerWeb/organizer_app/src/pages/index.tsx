import { IMAGE_PATH, MATERIAL_PATH } from "@/common/constant";
import LayoutMaster from "@/components/LayoutMaster";
import CarouselBanner from "@/components/home/CarouselBanner";
import Divider from "@/components/home/Divider";
import MiddleBanner from "@/components/home/MiddleBanner";
import ReviewCard from "@/components/home/ReviewCard";
import Image from "next/image";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { GetServerSideProps } from "next";
import { Dish } from "@/types";
import { ApiGetDishByTopViewed } from "@/services/DishService";
import React from "react";
import ShowDialog from "@/components/ShowDialog";
import Link from "next/link";

type Params = {
  dishData: Dish[],
  error: string,
}

const HomePage = ({dishData, error}: Params) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const [messageDialog, setMessageDialog] = React.useState("");
  const [titleDialog, setTileDialog] = React.useState("");
  const [typeDialog, setTypeDialog] = React.useState("");

  React.useEffect(()=>{
    if(error && error=='dishbanned'){
      setMessageDialog("Cannot access this recipe.");
      setTileDialog("Notice");
      setTypeDialog('info')
      handleOpenDialog();
    }
  },[]);
  return (
    <LayoutMaster>
      <div>
        <CarouselBanner />
        <div className="d-flex justify-content-center">
          <div className="row d-none d-sm-none d-md-flex w-75">
            <div style={{position:'relative'}} className="col-md-4 p-0">
              <Image src="/materials/card_banner_3.svg" width={0} height={0} style={{width:'100%',height:'auto'}} alt="Picture of the author" />
            </div>
            <div style={{position:'relative'}} className="col-md-4 p-0">
              <Image src="/materials/card_banner_2.svg" width={0} height={0} style={{width:'100%',height:'auto'}} alt="Picture of the author" />
            </div>
            <div style={{position:'relative'}} className="col-md-4 p-0">
              <Image src="/materials/card_banner_1.svg" width={0} height={0} style={{width:'100%',height:'auto'}} alt="Picture of the author" />
            </div>
          </div>
        </div>
        
        <div className="d-flex justify-content-center">
          <div className="w-100 w-sm-75">
            <MiddleBanner />
          </div>
        </div>
        {/* CHEF RECOMMENDS */}
        <div className="d-flex justify-content-center">
          <div className="w-100 w-sm-75">
            <div className="d-flex justify-content-center align-items-center" style={{position:'relative',minHeight:700}}>
              <LazyLoadImage src="/materials/bg_banner_1.svg" className="img-fit border-radius-15"  width={0} height={0} style={{position:'absolute',width:'100%',height:'600px'}} alt="Picture of the author" />
              <div className="row mt-5">
                {dishData && dishData.map((row,index)=> (
                    <div className="col-12 col-sm-4 px-3 mt-5 hover_cursor_size" key={index} >
                      <Link href={"./dish/"+row.url+"-"+row.id}>
                        <div style={{position:'relative'}}>
                          <LazyLoadImage className="img-fit" src={IMAGE_PATH+row.imageUrl+".png"} style={{width:'100%',height:260,borderRadius:20}} alt="Picture of the author"/>
                          <div style={{position:'absolute',bottom:0,left:0,backgroundColor:'rgba(0,0,0,0.75)',borderBottomLeftRadius:18,borderBottomRightRadius:18}} className="w-100 py-2 color-yellow d-flex justify-content-center align-items-center">
                              <ThumbUpOffAltIcon />
                              <span className="fw-bold ms-2">RECOMMENDED</span>
                          </div>
                        </div>  
                        <h3 style={{position:'relative'}} className="color-yellow mt-3">{row.dishName.toUpperCase()}</h3>
                        <p style={{position:'relative'}} className="color-yellow">{row.categoryDetail.name}</p>
                      </Link>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Perfect Ingredients */}
        <div className="d-flex justify-content-center my-5 row">
          <div className="col-12 col-sm-8">
            <div className="row">
                <div className="col-12 col-sm-6">
                  <Image src="/materials/perfect_ingredients.svg" width={0} height={0} style={{width:'100%',height:'auto'}} alt="Picture of the author" />
                </div>
                <div className="col-12 col-sm-6 d-flex align-items-center my-3">
                    <div>
                      <h1 style={{fontSize:44}} className='py-3'>Perfect Ingredients</h1>
                      <p><i>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Aenean lacinia bibend,um nulla sed consectetur. Vivamus sagittis lacus. </i></p>
                      <Link href={"/category/1"}><button className='btn btn-outline-orange'>LEARN MORE</button></Link>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="w-100">
            <Image src="/materials/bg_banner_end.svg" width={0} height={0} style={{width:'100%',height:'auto'}} alt="Picture of the author" />
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
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, query } = context;
  const {error} = query;
  const mError = (error as string || "");
  const dishData = await ApiGetDishByTopViewed() as Dish[];
  return { 
      props: { 
          error: mError,
          dishData,
      } 
  };
};

export default HomePage;