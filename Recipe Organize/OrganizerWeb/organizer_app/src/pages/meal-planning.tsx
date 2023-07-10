import { IMAGE_PATH, MATERIAL_PATH } from "@/common/constant";
import LayoutMaster from "@/components/LayoutMaster";
import { ApiGetDishByMealTime, ApiGetDishFullMeals, ApiGetDishRandByMealTime, ApiUpdateMealPlanning } from "@/services/DishService";
import { Cooker, Customer, Dish, Employee, JsonBody, UserInfoCookie } from "@/types";
import React from "react";
import { FormEvent } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { ApiGetCookerByUsername } from "@/services/CookerService";
import { ApiGetCustomerByUsername, ApiUpdateHeightWeight } from "@/services/CustomerService";
import { ApiGetEmployeeByUsername } from "@/services/EmployeeService";
import { GetServerSideProps } from "next";
import * as DatetimeUtils from "@/utils/DatetimeUtils";
import Image from "next/image";
import { isMetaProperty } from "typescript";
type Params = {
    customerData: Customer,
    userCookie: UserInfoCookie,
    caloBreakData: number,
    caloLunchData: number,
    caloDinnerData: number,
    breakData: Dish[],
    lunchData: Dish[],
    dinnerData: Dish[],
}

const Page = ({customerData, userCookie, caloBreakData, caloLunchData, caloDinnerData, breakData, lunchData, dinnerData}: Params) => {
    const [rotationStates, setRotationStates] = React.useState<boolean[]>([]);
    const [isGenerate,setIsGenerate] = React.useState(false);
    const [dish,setDish] = React.useState<Dish[] | null>(customerData.mealPlanning);
    const [dishBreakfast,setDishBreakfast] = React.useState<Dish[] | null>(breakData);
    const [dishLunch,setDishLunch] = React.useState<Dish[] | null>(lunchData);
    const [dishDinner,setDishDinner] = React.useState<Dish[] | null>(dinnerData);
    const [totalCalo,setTotalCalo] = React.useState(caloBreakData + caloLunchData + caloDinnerData);
    const [breakCalo,setBreakCalo] = React.useState(caloBreakData);
    const [lunchCalo,setLunchCalo] = React.useState(caloLunchData);
    const [dinnerCalo,setDinnerCalo] = React.useState(caloDinnerData);
    const [bmi,setBMI] = React.useState<string | null>(null);
    const [brm,setBRM] = React.useState<number | null>(null);
    const [weightStatus,setWeightStatus] = React.useState<string | null>(null);
    const [weightStatusBg,setWeightStatusBg] = React.useState<string>('');
    const [customer,setCustomer] = React.useState<Customer | null>(customerData);
    const handleSubmitGeneration = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsGenerate(true);
        const eatCalories = event.currentTarget.eatCalories;
        const mealTime = event.currentTarget.mealTime;
        if(!eatCalories.value.trim()){
            alert("Please input eat calories you want!");
            setIsGenerate(false);
            return;
        }
        if(mealTime.value.trim()=='All meals'){
            const result = await ApiGetDishFullMeals(eatCalories.value.trim()) as JsonBody;
            if(result){
                if(result.code=='01'){
                    setTotalCalo(eatCalories.value.trim());
                    updateGenerateData(result.data);
                    setIsGenerate(false);
                    const array = [] as number[];
                    for(let i = 0; i < result.data.length ; i++){
                        array.push(result.data[i].id);
                    }
                    if(customer){
                        await ApiUpdateMealPlanning(customer.id, array);
                    }
                    return;
                }
            }
            alert("Generate failed");
        } else {
            const result = await ApiGetDishByMealTime(mealTime.value.trim(),eatCalories.value.trim()) as JsonBody;
            if(result){
                if(result.code=='01'){
                    setTotalCalo(eatCalories.value.trim());
                    updateGenerateData(result.data);
                    setIsGenerate(false);
                    const array = [] as number[];
                    for(let i = 0; i < result.data.length ; i++){
                        array.push(result.data[i].id);
                    }
                    if(customer){
                        await ApiUpdateMealPlanning(customer.id, array);
                    }
                    return;
                }
            }
            alert("Generate failed");
        }
        setIsGenerate(false);

    }
    const handleIconClick = async (id: number,eatCalorie: number, mealTime: string) => {
        const newRotationStates: boolean[] = [...rotationStates];
        newRotationStates[id] = !newRotationStates[id];
        setRotationStates(newRotationStates);
        var totalCalorie = 0;
        var arrayDish = null;
        const idExist = [] as number[];
        if(mealTime=='Breakfast'){
            arrayDish = dishBreakfast;
            totalCalorie = totalCalo - lunchCalo - dinnerCalo;
        } else if(mealTime=='Lunch'){
            arrayDish = dishLunch;
            totalCalorie = totalCalo - breakCalo - dinnerCalo;
        } else if(mealTime=='Dinner'){
            arrayDish = dishDinner;
            totalCalorie = totalCalo - lunchCalo - breakCalo;
        }
        if(arrayDish!=null){
            for(let i = 0 ; i < arrayDish.length ; i ++){
                const item = arrayDish[i];
                if(item.id!=id){
                    totalCalorie-= item.totalCalorie;
                    idExist.push(item.id);
                }
            }
        }
        const result = await ApiGetDishRandByMealTime(totalCalorie, mealTime, idExist);
        if(result){
            if(result.code=='01'){
                if(dish){
                    const array = [] as Dish[];
                    const arrayId = [] as number[];
                    for(let i = 0; i < dish.length; i++){
                        if(id!=dish[i].id){
                            array.push(dish[i]);
                            arrayId.push(dish[i].id);
                        } else {
                            array.push(result.data);
                            arrayId.push(result.data.id);
                        }
                    }
                    if(customer){
                        await ApiUpdateMealPlanning(customer.id, arrayId);
                    }
                    updateGenerateData(array);
                }
            }
        }
    };

    const updateGenerateData = (data: Dish[]) => {
        setDish(data);
        const breaks = [] as Dish[];
        const lunchs = [] as Dish[];
        const dinners = [] as Dish[];
        var caloBreak = 0;
        var caloLunch = 0;
        var caloDinner = 0;
        let flagAll=1;
        for(let i = 0; i < data.length; i++){
            const item = data[i] as Dish;
            if(item.mealTime=='Breakfast'|| (item.mealTime=='All' && flagAll==1)){
                breaks.push(item);
                caloBreak+=item.totalCalorie;
            }else if(item.mealTime=='Lunch'|| (item.mealTime=='All' && flagAll==2)){
                lunchs.push(item);
                caloLunch+=item.totalCalorie;
            }else if(item.mealTime=='Dinner'|| (item.mealTime=='All' && flagAll==3)){
                dinners.push(item);
                caloDinner+=item.totalCalorie;
            }
            if(flagAll>=3)
                flagAll=1;
            else flagAll++;
        }
        setBreakCalo(caloBreak);
        setLunchCalo(caloLunch);
        setDinnerCalo(caloDinner);
        setDishBreakfast(breaks);
        setDishLunch(lunchs);
        setDishDinner(dinners);
    }

    const handleSubmitCalculating = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const height = event.currentTarget.height.value.trim()/100;
        const weight = event.currentTarget.weight.value.trim();
        const activity = event.currentTarget.activity.value;
        // Harris-Benedict:
        var brmNum = 0;
        
        if(customer){
            const age = DatetimeUtils.calculateAge(customer.dateOfBirth);
            if(customer.gender=='Male'){
                brmNum = 88.362 + (13.397 * weight) + (4.799 * height * 100) - (5.677 * age);
            }else{
                brmNum = 447.593 + (9.247 * weight) + (3.098 * height * 100) - (4.330 * age);
            }
            setBRM(brmNum*activity);
        }
        const result = await ApiUpdateHeightWeight(userCookie.userInfo.username,weight,height*100);
        if(result){
            if(result.code=='01'){
                const bmiNum = weight/(height*height);
                const bmiString = weight/(height*height) + "";
                const bmi = bmiString.substring(0,5);
                setBMI(bmi);
                if(bmiNum<18.5){
                    setWeightStatus("UNDERWEIGHT");
                    setWeightStatusBg("rgb(0, 102, 142)")
                } else if(bmiNum<24.9){
                    setWeightStatus("NORMAL");
                    setWeightStatusBg("rgb(102, 194, 202)")
                } else if(bmiNum<29.9){
                    setWeightStatus("OVERWEIGHT");
                    setWeightStatusBg("rgb(244, 173, 133)")
                } else if(bmiNum<34.9){
                    setWeightStatus("OBESE");
                    setWeightStatusBg("rgb(241, 118, 50)")
                } else {
                    setWeightStatus("EXTREMELY OBESE");
                    setWeightStatusBg("rgb(202, 67, 76)")
                }
                return;
            }
        }
        alert("Calculating failed");
    }

    return (
        <LayoutMaster>
                <div className="row d-flex justify-content-center mt-5 py-4" style={{backgroundImage:'url("/materials/bg_left_1.png")'}}>
                    <div className="col-12 col-sm-12 col-md-5">
                        <div className="bg-white border-radius-10">
                        {customer && (
                            <>
                                <div className='d-flex justify-content-start bg-white mt-0 m-3'>
                                    <div className='mx-3'>
                                        <div className="d-flex justify-content-center">
                                            <LazyLoadImage className="img-fit" src={IMAGE_PATH+customer.imageUrl+".png"} style={{width:260,height:260,borderRadius:'50%'}} alt="Picture of the author"/>
                                        </div>
                                    </div>
                                    <div className='m-3'>
                                        <h2>{customer.fullName}</h2>
                                        <p><b>Date of birth :</b> {DatetimeUtils.formatDateString(customer.dateOfBirth)}</p>
                                        <p><b>Phone :</b> {customer.phone}</p>
                                        <p><b>Address :</b> {customer.address}</p>
                                        <p><b>City :</b> {customer.city}</p>
                                        <p><b>Gender :</b> {customer.gender}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className='m-3'>
                                    <form onSubmit={handleSubmitCalculating}>
                                        <LazyLoadImage src={MATERIAL_PATH+"bmi-chart.png"} style={{width:'100%',height:'auto'}} alt="Picture of the author"/>
                                        <div className="d-flex justify-content-start row">
                                            <div className="form-group d-flex align-items-center mt-2 col-4">
                                                <label className="ws-150">Height (cm): </label>
                                                <input type="number" className="w-100 form-control" defaultValue={customer.height > 0 && customer.height || ""} id="height" placeholder="Input your height" required />
                                            </div>
                                            <div className="form-group d-flex align-items-center mt-2 col-4">
                                                <label className="ws-150">Weight (kg): </label>
                                                <input type="number" className="w-100 form-control" defaultValue={customer.weight > 0 && customer.weight || ""} id="weight" placeholder="Input your weight" required/>
                                            </div>
                                            <div className="form-group d-flex align-items-center mt-2 col-4">
                                                <label className="ws-150">Activity: </label>
                                                <select className="form-select" id="activity">
                                                    <option value={1.2}>Sedentary</option>
                                                    <option value={1.375}>Lightly</option>
                                                    <option value={1.55}>Moderately</option>
                                                    <option value={1.725}>Very</option>
                                                    <option value={1.9}>Extra</option>
                                                </select>
                                            </div>
                                        </div>
                                        {bmi && (
                                            <div className="w-100 bg-lightyellow mt-3 p-3 border-radius-10 text-light" style={{backgroundColor:weightStatusBg}}>
                                                <div>
                                                    <span><b>Your BMI: </b></span>
                                                    <span>{bmi}</span>
                                                </div>
                                                <div>
                                                    <span><b>Your BRM: </b></span>
                                                    <span>{brm && brm.toFixed(0)} (calories to maintain your body everyday)</span>
                                                </div>
                                                <div>
                                                    <span><b>You can eat: </b></span>
                                                    <span>{brm && (brm-500).toFixed(0)} (calories to decrease 0.5kg everyweek)</span>
                                                </div>
                                                <div>
                                                    <span><b>Weight status: </b></span>
                                                    <span>{weightStatus}</span>
                                                </div>
                                            </div>
                                        )}
                                        
                                        <div className="text-center my-3">
                                            <button type="submit" className="btn btn-orange">Calculating</button>
                                        </div>
                                    </form>
                                </div>
                            </>
                        )}
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-5">
                        <div className="d-flex justify-content-center w-100 mb-5">
                            <div className='px-5 pb-5 w-100' style={{backgroundImage:'url("/materials/bg_gen_calo.jpg")',borderRadius:20,border:'1px solid lightgray'}}>
                                <h1 className="text-center my-5 text-white">Put your diet on autopilot</h1>
                                <form onSubmit={handleSubmitGeneration}>
                                    <div className="form-group d-flex align-items-center">
                                        <label className="ws-150 text-white"><b>I want to eat: </b></label>
                                        <input className="form-control" id="eatCalories" defaultValue={1000} placeholder="Ex: 1000 calories"  />
                                    </div>
                                    <div className="form-group d-flex mt-3  align-items-center">
                                        <label className="ws-150 text-white"><b>In: </b></label>
                                        <select className="form-select" id="mealTime">
                                            <option>All meals</option>
                                            <option>Breakfast</option>
                                            <option>Lunch</option>
                                            <option>Dinner</option>
                                        </select>
                                    </div>
                                    <div className="text-center mt-3">
                                        {isGenerate && (
                                            <button className="btn btn-orange" disabled>GENERATING...</button>
                                        ) || (
                                            <button className="btn btn-orange">GENERATE</button>
                                        )}
                                    </div>
                                </form>
                            </div>  
                        </div>
                        <div className="border-radius-10 bg-white">
                            <h3 className="text-center">Meal planning for you</h3>
                            <p className="text-center"><i>(Total calories: {breakCalo+lunchCalo+dinnerCalo})</i></p>
                            <div className="p-3" style={{borderRadius:10}}>
                                <h4>Breakfast</h4>
                                <p>{breakCalo} calories</p>
                                {dishBreakfast && dishBreakfast.map((row,index)=>(
                                    <div className="d-flex align-items-center mt-3 hover_bg_yellow p-2" key={index} >
                                        <div className="d-flex align-items-center" onClick={()=>{location.href="../dish/"+row.url+"-"+row.id}}>
                                            <LazyLoadImage className="img-fit" src={IMAGE_PATH+row.imageUrl+".png"} style={{width:50,height:50,borderRadius:20}} alt="Picture of the author"/>
                                            <div className="ms-3">
                                                <b>{row.dishName}</b><br/>
                                                <span className="text-secondary">{row.servings} servings</span>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1"></div>
                                        <div>
                                            <RestartAltIcon className={`color-orange cursor-pointer f-size-36 ${rotationStates[row.id] ? 'rotate-icon' : ''}`} onClick={() => handleIconClick(row.id,row.totalCalorie,"Breakfast")}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr />
                            <div className="p-3" style={{borderRadius:10}}>
                                <h4>Lunch</h4>
                                <p>{lunchCalo} calories</p>
                                {dishLunch && dishLunch.map((row,index)=>(
                                    <div className="d-flex mt-3 align-items-center mt-3 hover_bg_yellow p-2" key={index}>
                                        <div className="d-flex align-items-center" onClick={()=>{location.href="../dish/"+row.url+"-"+row.id}}>
                                            <LazyLoadImage className="img-fit" src={IMAGE_PATH+row.imageUrl+".png"} style={{width:50,height:50,borderRadius:20}} alt="Picture of the author"/>
                                            <div className="ms-3">
                                                <b>{row.dishName}</b><br/>
                                                <span className="text-secondary">{row.servings} servings</span>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1"></div>
                                        <div>
                                            <RestartAltIcon className={`color-orange cursor-pointer f-size-36 ${rotationStates[row.id] ? 'rotate-icon' : ''}`} onClick={() => handleIconClick(row.id,row.totalCalorie, "Lunch")}/>
                                        </div>
                                    </div>
                                ))}
                                
                            </div>
                            <hr />
                            <div className="p-3" style={{borderRadius:10}}>
                                <h4>Dinner</h4>
                                <p>{dinnerCalo} calories</p>
                                {dishDinner && dishDinner.map((row,index)=>(
                                    <div className="d-flex mt-3 align-items-center mt-3 hover_bg_yellow p-2" key={index}>
                                        <div className="d-flex align-items-center" onClick={()=>{location.href="../dish/"+row.url+"-"+row.id}}>
                                            <LazyLoadImage className="img-fit" src={IMAGE_PATH+row.imageUrl+".png"} style={{width:50,height:50,borderRadius:20}} alt="Picture of the author"/>
                                            <div className="ms-3">
                                                <b>{row.dishName}</b><br/>
                                                <span className="text-secondary">{row.servings} servings</span>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1"></div>
                                        <div>
                                            <RestartAltIcon className={`color-orange cursor-pointer f-size-36 ${rotationStates[row.id] ? 'rotate-icon' : ''}`} onClick={() => handleIconClick(row.id,row.totalCalorie, "Dinner")}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr />
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
    if (userCookie === null || userCookie.userInfo.role.roleName!='Customer') {
        res.writeHead(302, { Location: "../login?returnUrl=meal-planning" });
        res.end();
        return { props: {} };
    }
    var customerData = null;
    customerData = await ApiGetCustomerByUsername(userCookie.userInfo.username) as Customer;
    
    const data = customerData.mealPlanning;
    const breakData = [] as Dish[];
    const lunchData = [] as Dish[];
    const dinnerData = [] as Dish[];
    var caloBreakData = 0;
    var caloLunchData = 0;
    var caloDinnerData = 0;
    let flagAll = 1;
    if(data){
        for(let i = 0; i < data.length; i++){
            const item = data[i] as Dish;
            if(item.mealTime=='Breakfast' || (item.mealTime=='All' && flagAll==1)){
                breakData.push(item);
                caloBreakData+=item.totalCalorie;
            }else if(item.mealTime=='Lunch' || (item.mealTime=='All' && flagAll==2)){
                lunchData.push(item);
                caloLunchData+=item.totalCalorie;
            }else if(item.mealTime=='Dinner' || (item.mealTime=='All' && flagAll==3)){
                dinnerData.push(item);
                caloDinnerData+=item.totalCalorie;
            }
            if(flagAll>=3){
                flagAll=1;
            }else flagAll++;
        }
    }
    

    return { 
        props: { 
            customerData,
            userCookie,
            caloBreakData,
            caloLunchData,
            caloDinnerData,
            breakData,
            lunchData,
            dinnerData,
        } 
    };
};

export default Page;