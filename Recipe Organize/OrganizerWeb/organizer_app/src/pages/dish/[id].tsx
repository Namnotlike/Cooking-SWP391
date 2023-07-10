import Image from "next/image";
import { Row } from "react-bootstrap";
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarRateIcon from '@mui/icons-material/StarRate';
import CircleIcon from '@mui/icons-material/Circle';
import { Button } from "@mui/material";
import LayoutMaster from "@/components/LayoutMaster";
import ShareIcon from '@mui/icons-material/Share';
import { ApiGetDishByCategory, ApiGetDishById, ApiUpdateViewed } from "@/services/DishService";
import React, { ChangeEvent, FormEvent } from "react";
import { Cooker, Dish, Favorite, Feedback, JsonBody, RatingRecipe, UserInfoCookie } from "@/types";
import { GetServerSideProps } from "next";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IMAGE_PATH, MATERIAL_PATH } from "@/common/constant";
import AlarmIcon from '@mui/icons-material/Alarm';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import RestoreIcon from '@mui/icons-material/Restore';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Rating from '@mui/material/Rating';
import { ApiAddOrRemoveFavorite, ApiCheckLoved, ApiGetFavoriteByAccountAndDishId } from "@/services/FavoriteService";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ApiCreateFeedback, ApiGetFeedbackByDishId } from "@/services/FeedbackService";
import { getTimeDiff } from "@/utils/DatetimeUtils";
import * as Constant from '@/common/constant';
import ItemDish from "@/components/listRecipe/ItemDish";
import ReportIcon from '@mui/icons-material/Report';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ApiCreateReport } from "@/services/ReportService";
import { ApiGetCookerById, ApiGetCookerCountLoved } from "@/services/CookerService";
import ShowDialog from "@/components/ShowDialog";
import CookerRankIcon from "@/components/CookerRankIcon";
import { useRouter } from "next/router";
import { ApiCreateRating, ApiGetRatingByDishAndAccountId } from "@/services/RatingService";
type Params = {
    cookerCountLoved: JsonBody,
    ratedData: RatingRecipe,
    feedbackData: Feedback[],
    dishRelated: Dish[],
    dishData: Dish,
    favoriteData: Favorite,
    userCookie: UserInfoCookie,
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const DishPage = ( {cookerCountLoved, ratedData, feedbackData, dishRelated, dishData, favoriteData, userCookie} : Params) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


   
    // const [feedBackContent, setFeedBackContent] = React.useState("");

    const [openDialog, setOpenDialog] = React.useState(false);
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);
    const [messageDialog, setMessageDialog] = React.useState("");
    const [titleDialog, setTileDialog] = React.useState("");
    const [typeDialog, setTypeDialog] = React.useState("");
    const [ratingData, setRatingData] = React.useState(ratedData);
    const [countLoved, setCountLoved] = React.useState(cookerCountLoved && cookerCountLoved.data || 0);

    const [openDialogConfirm, setOpenDialogConfirm] = React.useState(false);
    const handleOpenDialogConfirm = () => setOpenDialogConfirm(true);
    const handleCloseDialogConfirm = () => setOpenDialogConfirm(false);
    const [confirmType,setConfirmType] = React.useState("");

    const [isShowMore, setIsShowMore] = React.useState("Show more");
    const [feedbacks,setFeedbacks] = React.useState<Feedback[]>(feedbackData);
    const [feedbackPag,setFeedbackPag] = React.useState<Feedback[]>(feedbackData && feedbackData.slice(0,Constant.ITEM_PER_FEEDBACK));
    const [loved,setLoved] = React.useState(favoriteData && true || false);
    const [dish,setDish] = React.useState(dishData);
    const [rateValue, setRateValue] = React.useState<number | null>(ratingData && ratingData.ratingPoint || 0);
    const [dishRelate,setDishRelate] = React.useState<Dish[] | null>(dishRelated);

    const handleClickYes = async () => {
        if(confirmType=='Feedback'){
            let feedBackContent = "";
            const feedBackContentElement = document.getElementById('feedBackContent') as HTMLInputElement;
            if (feedBackContentElement !== null) {
                feedBackContent = feedBackContentElement.value;
            }
            const result = await ApiCreateFeedback(feedBackContent, dish.id+"", rateValue+"", userCookie.userInfo.username, userCookie.userInfo.role.roleName);
            if(result){
                if(result.code=='01'){
                    setFeedbacks((feedbacks)=>[result.data,...feedbacks]);
                    setFeedbackPag((feedbackPag)=>[result.data,...feedbackPag]);
                    feedBackContentElement.value = "";
                    setMessageDialog("Create feedback successfully!");
                    setTileDialog("Notice");
                    setTypeDialog('info')
                    handleOpenDialog();
                    return;
                }
            }
            alert("Create feedback failed");
        }else if(confirmType=='Rating'){
            const result = await ApiCreateRating(dish.id+"", userCookie.userInfo.id+"",rateValue+"");
            if(result && result.code=='01'){
                setMessageDialog("Rating successfully!");
                setTileDialog("Notice");
                setTypeDialog('info')
                handleOpenDialog();
                setRatingData(result.data)
                const array = [];
                const arrayPag = [];
                const ratingRecipe = result.data as RatingRecipe;
                for(let i = 0 ; i < feedbacks.length ; i++){
                    const feedback = feedbacks[i] as Feedback;
                    var accountId = 0;
                    if(userCookie.userInfo.role.roleName=="Cooker"){
                        accountId = feedback.cooker.account.id;
                    }else if(feedback.customer){
                        accountId = feedback.customer.account.id;
                    }
                    if(accountId == ratingRecipe.accountId){
                        feedback.ratingPoint = ratingRecipe.ratingPoint;
                    }
                    array.push(feedback);
                }
                for(let i = 0 ; i < feedbackPag.length ; i++){
                    const feedback = feedbackPag[i] as Feedback;
                    var accountId = 0;
                    if(userCookie.userInfo.role.roleName=="Cooker"){
                        accountId = feedback.cooker.account.id;
                    }else if(feedback.customer){
                        accountId = feedback.customer.account.id;
                    }
                    if(accountId == ratingRecipe.accountId){
                        feedback.ratingPoint = ratingRecipe.ratingPoint;
                    }
                    arrayPag.push(feedback);
                }
                setFeedbacks(array);
                setFeedbackPag(arrayPag);
                return;
            }
            setMessageDialog("Rating Failed!");
            setTileDialog("Notice");
            setTypeDialog('error')
            handleOpenDialog();
        }
    }
    
   

    const router = useRouter();
    const getSlugFromPath = () => {
        const pathParts = router.asPath.split('/');
        const slug = pathParts[pathParts.length - 1];
        return slug;
    };

    const dishId = getSlugFromPath();
    React.useEffect(() => {
        const fetchData = async () => {
            if(dish.id+"" != dishId){
                const id = dishId as string;
                const myArray = id.split("-");
                const extractedDishId = myArray[myArray.length - 1];

                const dishData = await ApiGetDishById(parseInt(extractedDishId)) as Dish;
                var favoriteData = null;
                var ratingDataResult = null;
                if (userCookie) {
                    favoriteData = await ApiGetFavoriteByAccountAndDishId(userCookie.userInfo.id + "", extractedDishId);
                    ratingDataResult = await ApiGetRatingByDishAndAccountId(extractedDishId, userCookie.userInfo.id+"");
                }
                const feedbackData = await ApiGetFeedbackByDishId(extractedDishId) as Feedback[];
                const dishRelated = await ApiGetDishByCategory(dishData.categoryDetail.id + "", "1", "8");
                const cookerCountLoved = await ApiGetCookerCountLoved(dishData.cookerId) as JsonBody;
                ApiUpdateViewed(extractedDishId);

                setDish(dishData);
                setFeedbacks(feedbackData);
                setFeedbackPag(feedbackData && feedbackData.slice(0,Constant.ITEM_PER_FEEDBACK));
                setLoved(favoriteData && true || false);
                setDishRelate(dishRelated?.data);
                if(ratingDataResult){
                    console.log(ratingDataResult);
                }
                setCountLoved(cookerCountLoved && cookerCountLoved.data || 0);
                setRatingData(ratingDataResult && ratingDataResult.code=='01' && ratingDataResult.data || 0);
                setRateValue(ratingDataResult && ratingDataResult.code=='01' && ratingDataResult.data.ratingPoint || 0)
            }
        };
        fetchData();
    }, [dishId]);

    React.useEffect(()=>{
        if(favoriteData && favoriteData.customize){
            const customizedDish = {
                ...dish,
                description: favoriteData.customize.description,
                prepTime: favoriteData.customize.prepTime,
                cookTime: favoriteData.customize.cookTime,
                servings: favoriteData.customize.servings,
                process: favoriteData.customize.process,
                ingredient: favoriteData.customize.ingredient
                };
            setDish(customizedDish);
        }
    },[]);

    const pTitleStyle = {
        backgroundColor: 'transparent',
        color: '#FF7C68',
        fontWeight: 'bold',
        margin:0
    };

    const handleClickLove = async () => {
        if(userCookie && (userCookie.userInfo.role.roleName=="Cooker" || userCookie.userInfo.role.roleName=="Customer")){
            const result = await ApiAddOrRemoveFavorite(userCookie.userInfo.role.roleName,userCookie.userInfo.id+"",dishData.id+"");
            if(result){
                if(result.code=='01')
                {
                    if(result.data==null){
                        setLoved(false);
                        setCountLoved(countLoved-1);
                    }else{
                        setLoved(true);
                        setCountLoved(countLoved+1);
                    }
                }else {
                    alert(result.message)
                }
            }
        }else{
            setMessageDialog("Please login as customer!");
            setTileDialog("Notice");
            setTypeDialog('info')
            handleOpenDialog();
        }
    };
    const handleChangeCustomize = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.value;
        if (value === 'Customize') {
            const customizedDish = {
            ...dish,
            description: favoriteData.customize.description,
            prepTime: favoriteData.customize.prepTime,
            cookTime: favoriteData.customize.cookTime,
            servings: favoriteData.customize.servings,
            process: favoriteData.customize.process,
            ingredient: favoriteData.customize.ingredient
            };
            setDish(customizedDish);
        } else {
            setDish(dishData);
        }
    };
    const handleClickShowMore = () => {
        if(isShowMore=="Show more"){
            setFeedbackPag(feedbacks);
            setIsShowMore("Hide in");
        }else{
            setFeedbackPag(feedbacks.slice(0,Constant.ITEM_PER_FEEDBACK));
            setIsShowMore("Show more");
        }
    }
    const handleSubmitFeedback = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!userCookie || !userCookie.userInfo)
        {
            setMessageDialog("Login please!");
            setTileDialog("Notice");
            setTypeDialog('info');
            handleOpenDialog();
            return;
        }
        const feedBackContent = event.currentTarget.feedBackContent;
        if(!feedBackContent.value.trim()){
            alert("Feedback can't be empty");
            return;
        }
        if(userCookie.userInfo.role.roleName == 'Employee'){
            alert("Employee can not be feedback");
            return;
        }
        setMessageDialog("Are you sure to create feedback?");
        setTypeDialog("info");
        setTileDialog("Notice");
        setConfirmType('Feedback');
        handleOpenDialogConfirm();
    }

    const handleSubmitReport = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const reason = event.currentTarget.reason.value.trim();
        const description = event.currentTarget.description.value.trim();
        if(userCookie==null || userCookie.userInfo == null){
            // alert("Admin can not be create Report!");
            setMessageDialog("Login please!");
            setTileDialog("Notice");
            setTypeDialog('info')
            handleOpenDialog();
            return;
        }
        if(!description){
            alert("Description can not be empty");
            return;
        }
        if(userCookie.userInfo.role.roleName=='Employee'){
            // alert("Admin can not be create Report!");
            setMessageDialog("Admin can not be create Report!");
            setTileDialog("Notice");
            setTypeDialog('info')
            handleOpenDialog();
            return;
        }
        const result = await ApiCreateReport(dish.id, userCookie.userInfo.username, description, reason);
        if(result && result.code=='01'){
            if(userCookie && (userCookie.userInfo.role.roleName=="Cooker" || userCookie.userInfo.role.roleName=="Customer")){
                if(loved){
                    const resultLove = await ApiAddOrRemoveFavorite(userCookie.userInfo.role.roleName,userCookie.userInfo.id+"",dishData.id+"");
                    if(resultLove && resultLove.code=='01'){
                        setLoved(false);
                        setCountLoved(countLoved-1);
                    }
                }
            }
            handleClose();
            setMessageDialog("Send report successfully!");
            setTileDialog("Notice");
            setTypeDialog('info')
            handleOpenDialog();
            return;
        }
        alert("Send report failed");
    }

    const handleClickReport = () => {
        if(userCookie==null || userCookie==null){
            router.push("/login?returnUrl=/dish/"+dish.url+"-"+dish.id);
        }else{
            handleOpen();
        }
    }

    const handleClickShare = () => {
        const url = Constant.URL_FONTEND+"/dish/"+dish.url+"-"+dish.id;
         // Tạo một phần tử input tạm thời
        const tempInput = document.createElement("input");
        tempInput.value = url;
        document.body.appendChild(tempInput);

        // Chọn toàn bộ nội dung trong input tạm thời
        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // Hỗ trợ cho các trình duyệt di động

        // Copy nội dung vào clipboard
        document.execCommand("copy");

        // Xóa phần tử input tạm thời
        document.body.removeChild(tempInput);

        // Thông báo đã sao chép thành công
        setMessageDialog("The URL has been copied to the clipboard!");
        setTileDialog("Notice");
        setTypeDialog('info');
        handleOpenDialog();
    }

    const handleSetRating = async (newValue: number) => {
        if(!userCookie || !userCookie.userInfo)
        {
            setMessageDialog("Login please!");
            setTileDialog("Notice");
            setTypeDialog('info');
            handleOpenDialog();
            return;
        }
        setMessageDialog("Are you sure to rating this recipe?");
        setTypeDialog("info");
        setTileDialog("Notice");
        setConfirmType('Rating');
        handleOpenDialogConfirm();
        setRateValue(newValue);
    }

    return(
        <LayoutMaster>
        <div className="px-0 px-sm-0 px-md-0" style={{backgroundImage:'url("/materials/bg_dish_1.png")'}}>
            <div className="p-0 p-sm-0 p-md-5 pt-0 m-0 m-sm-0 m-md-5">
                <div className="px-0 px-sm-0 px-md-5 pt-0 mx-0 mx-sm-0 mx-md-5 ">
                {/* HEADER CONTENT */}
                <div className="row p-3 bg-white border-radius-15">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                        {/* <LazyLoadImage className="mb-1" src={IMAGE_PATH+dish.imageUrl+".png"} style={{width:'100%',height:'100%',borderRadius:20}} alt="Picture of the author"/> */}
                        <LazyLoadImage className="mb-1 img-fit" src={IMAGE_PATH+dish.imageUrl+".png"} style={{width:'100%',height:420,borderRadius:20}} alt="Picture of the author"/>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-8 px-5 pb-3">
                        <h1 className="mt-3">{dish.dishName}</h1>
                        <div className="d-flex align-items-center">
                            <Rating name="read-only" value={dish.ratingPoint} readOnly />
                            <span>({countLoved} Loves)</span>
                        </div>
                        {favoriteData && favoriteData.customize && (
                            <select className="form-select my-3 w-25"  onChange={(event: React.ChangeEvent<HTMLSelectElement>)=>handleChangeCustomize(event)} >
                                <option>Customize</option>
                                <option>Origin</option>
                            </select>
                        ) || (<div className="mb-5"></div>)}
                        <p className="mb-5">{dish.description}</p>
                        <div className="row mb-2 mx-0" style={{borderBottom:'1px solid black'}}>
                            <div className="col-3 text-center mb-4" style={{borderInlineEnd:'1px solid black'}}>
                                <AlarmIcon className="f-size-48"/>
                                <p>Prep Time</p>
                                <p>{dish.prepTime} mins</p>
                            </div>
                            <div className="col-3 text-center mb-4" style={{borderInlineEnd:'1px solid black'}}>
                                <RestoreIcon className="f-size-48" />
                                <p>Cook Time</p>
                                <p>{dish.cookTime} mins</p>
                            </div>
                            <div className="col-3 text-center mb-4" style={{borderInlineEnd:'1px solid black'}}>
                                <AlarmOnIcon className="f-size-48" />
                                <p>Total Time</p>
                                <p>{dish.prepTime + dish.cookTime} mins</p>
                            </div>
                            <div className="col-3 text-center mb-4">
                                <PeopleAltIcon className="f-size-48" />
                                <p>Servings</p>
                                <p>{dish.servings} peoples</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <span className="text-secondary">Created by <span className="color-orange"><a className="me-2" href={"../search?cooker="+dish.cookerId}>{dish.cookerName}</a><CookerRankIcon rank={dish.cookerRank}/></span></span>
                            <div className="flex-grow-1"></div>
                            {loved && (
                                <Button className="me-2 bg-white color-orange" style={{borderColor:'#FF7C68',fontSize:16}} startIcon={<FavoriteIcon style={{fontSize:20}}/>} onClick={handleClickLove}>LOVED</Button>
                            ) || (
                                <Button className="me-2 bg-white color-orange" style={{borderColor:'#FF7C68',fontSize:16}} startIcon={<FavoriteBorderIcon style={{fontSize:20}}/>} onClick={handleClickLove}>LOVE</Button>
                            )}
                            <Button className="bg-white color-orange" style={{borderColor:'#FF7C68',fontSize:16}} startIcon={<ReportIcon style={{fontSize:20}}/>}  onClick={handleClickReport}>REPORT</Button>
                            <Button className="bg-white color-orange" style={{borderColor:'#FF7C68',fontSize:16}} startIcon={<ShareIcon style={{fontSize:20}}/>}  onClick={handleClickShare}>SHARE</Button>
                        </div>
                        
                    </div>
                </div>
                {/* BODY CONTENT */}
                <div className="row mt-5 bg-white border-radius-15">
                    {/* PROCESS */}
                    <div className="col-12 col-sm-6 p-4">
                        <div>
                            <p className="f-size-36" style={pTitleStyle}>Process</p>
                            <div className="p-2"  dangerouslySetInnerHTML={{__html: dish.process}}>
                            </div>
                        </div>
                    </div>
                    {/* PREPARE */}
                    <div className="col-12 col-sm-6 p-4">
                        <p className="f-size-36" style={pTitleStyle} >Ingredients</p>
                        <div>
                            <div style={{backgroundImage:'url("/materials/page_bg.svg")', backgroundRepeat: 'no-repeat'}} className="overlay-content px-4">
                                <div className="px-3 pt-5">
                                    <div dangerouslySetInnerHTML={{__html: dish.ingredient}} style={{overflowY:'auto',maxHeight:1000,paddingLeft:50}}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* FEEDBACK */}
                <div className="row p-3 mt-5 bg-white border-radius-15">
                    <div className="col-12 col-sm-6">
                        <h3>Add comments</h3>
                        <div className="d-flex">
                            <Rating
                                name="simple-controlled"
                                value={rateValue}
                                onChange={(event, newValue) => {
                                    if(newValue){
                                        handleSetRating(newValue);
                                    }
                                }}
                            />
                            {ratingData && ratingData.ratingPoint>0 && (
                                <span>(Rated)</span>
                            ) || (<></>)}
                        </div>
                        <form onSubmit={handleSubmitFeedback}>
                            <div style={{position:'relative'}}>
                                <textarea className="form-control" id="feedBackContent" rows={7} placeholder="Input your feedback..."></textarea>
                                <button style={{position:'absolute',bottom:20, right:20}} className="px-5 btn btn-orange" >Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-12 col-sm-6">
                        <h3>Comments ({feedbacks && feedbacks.length || 0})</h3>
                        {feedbackPag && feedbackPag.map((row,index)=>(
                            <div key={index}>
                                <div className="d-flex align-items-center ">
                                    <div className="bg-danger mx-2" style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden' }}>
                                        <LazyLoadImage src={IMAGE_PATH + row.ownerAvt +".png"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Picture of the author" />
                                    </div>
                                    <div >
                                        <p className="p-0 m-0"><b>{row.ownerName}</b></p>
                                        <p className="color-orange p-0 m-0">{getTimeDiff(row.createAt)}</p>
                                        <p className="p-0 m-0 text-secondary">{row.feedBackContent}</p>
                                        {(row.cookerId && row.cookerId==dishData.cookerId) || row.ratingPoint==0 && (
                                            <></>
                                        ) || (
                                            <Rating name="read-only" value={row.ratingPoint} readOnly />
                                        )}
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))}
                        <div className="text-center">
                            <a className="color-orange cursor-pointer" onClick={handleClickShowMore}><u>{isShowMore}</u></a>
                        </div>
                    </div>
                </div>
                {/* OTHER DISH YOU MAY LIKE */}
                <div className="row p-3 px-5 mt-5 bg-white border-radius-15">
                    <h3>Other Recipes You May Like</h3>
                    <div className="row">
                        {dishRelate && dishRelate.map((row,index) => (
                            <ItemDish key={index} dish={row} />
                        ))}
                    </div>  
                </div>

            </div>
            </div>
        </div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Send report
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <form onSubmit={handleSubmitReport}>
                    <div className="d-flex align-items-center">
                        <label className="ws-80"><b>Recipe: </b></label>
                        <span>{dish.dishName}</span>
                    </div>
                    <div className="d-flex align-items-center mt-3">
                        <label className="ws-80"><b>Reason: </b></label>
                        <select className="ws-300 form-select" id="reason">
                                <option>Incorrect recipes.</option>
                                <option>Incorrect cooking ingredients.</option>
                                <option>Copy other people's recipes.</option>
                                <option>Another</option>
                        </select>
                    </div>
                    <div className="d-flex  mt-3">
                        <label className="ws-80"><b>Content: </b></label>
                        <textarea className="ws-300 form-control" rows={5} id="description" placeholder="Input content report"></textarea>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <button type="submit" className="btn btn-orange">Send report</button>
                    </div>
                </form>
            </Typography>
            </Box>
        </Modal>
        <ShowDialog 
                content={messageDialog}
                title={titleDialog}
                type={typeDialog}
                buttonOk={true}
                open={openDialog}
                setOpen={setOpenDialog}
            />
        <ShowDialog 
            content={messageDialog}
            title={titleDialog}
            type={typeDialog}
            buttonYesNo={true}
            handleClickYes={handleClickYes}
            open={openDialogConfirm}
            setOpen={setOpenDialogConfirm}
            />
        </LayoutMaster>
        
    )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params,query, req, res } = context;
    const id = params?.id as string;
    const myArray = id.split("-");
    const dishId = myArray[myArray.length - 1];
    const dishData = await ApiGetDishById(parseInt(dishId)) as Dish;

    const { userInfoCookie } = req.cookies;
    var userCookie = null;
    if(userInfoCookie){
        userCookie = JSON.parse(userInfoCookie) as UserInfoCookie;
    }

    // REDIRECT TO HOME
    if (dishData.status!='ACTIVE' && (userCookie?.userInfo.role.roleName=='Customer' || userCookie?.userInfo.role.roleName=='Cooker')) {
        res.writeHead(302, { Location: "../?error=dishbanned" });
        res.end();
        return { props: {} };
    }

    var favoriteData = null;
    var ratingDataResult = null;
    if(userCookie){
        favoriteData = await ApiGetFavoriteByAccountAndDishId(userCookie.userInfo.id+"",dishId);
        ratingDataResult = await ApiGetRatingByDishAndAccountId(dishId, userCookie.userInfo.id+"");
    }

    const feedbackData = await ApiGetFeedbackByDishId(dishId) as Feedback[];
    
    const cookerCountLoved = await ApiGetCookerCountLoved(dishData.cookerId) as JsonBody;

    const dishRelated = await ApiGetDishByCategory(dishData.categoryDetail.id+"","1","8");
    //ApiUpdateViewed(dishId);

    return { props: { 
        cookerCountLoved,
        ratedData : ratingDataResult && ratingDataResult.code=='01' && ratingDataResult.data || 0,
        feedbackData,
        dishRelated: dishRelated?.data,
        dishData,
        userCookie,
        favoriteData,
     } };
};

export default DishPage;
