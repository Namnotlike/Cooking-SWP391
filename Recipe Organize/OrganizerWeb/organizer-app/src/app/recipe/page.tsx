'use client';
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import RecipeCard from '@/components/recipe/RecipeCard';
import LayoutMaster from '@/components/LayoutMaster';
const Page = () => {
    return (
        <LayoutMaster>
        <div>
            {/* BANNER */}
            <Image src="/materials/banner_recipe.svg" width={0} height={0} style={{width:'100%',height:'auto'}} alt="Picture of the author" />
            {/* TAG CHIPS AREA */}
            <div className='d-flex justify-content-center'>
                <div className='d-flex flex-wrap justify-content-center my-5' style={{width:800}}>
                    <button className='btn btn-outline-secondary m-2' style={{borderRadius:20}}>Chip outlined</button>
                    <button className='btn btn-outline-secondary m-2' style={{borderRadius:20}}>Chip out</button>
                    <button className='btn btn-outline-secondary m-2' style={{borderRadius:20}}>Chip in</button>
                    <button className='btn btn-outline-secondary m-2' style={{borderRadius:20}}>Chip default</button>
                    <button className='btn btn-outline-secondary m-2' style={{borderRadius:20}}>Chip tag</button>
                    <button className='btn btn-outline-secondary m-2' style={{borderRadius:20}}>Chip none</button>
                    <button className='btn btn-outline-secondary m-2' style={{borderRadius:20}}>Chip variant</button>
                    <button className='btn btn-outline-secondary m-2' style={{borderRadius:20}}>Chip default</button>
                    <button className='btn btn-outline-secondary m-2' style={{borderRadius:20}}>Chip out</button>
                </div>
            </div>
            {/* SEARCH TOOL AREA */}
            <div className='d-flex justify-content-center'>
                <div className='d-flex justify-content-center bg-white p-2 px-4' style={{borderRadius:15,boxShadow:'5px 5px 5px 5px lightgray'}}>
                    <SearchIcon style={{color:'gray'}}/>
                    <input type='text' placeholder='Search recipes' className='px-2' style={{border:'none',outline:'none'}} />
                </div>
            </div>
            {/* BODY CONTENT */}
            <div  style={{paddingInline:200}}>
                {/* HOT RECIPES */}
                <div className='d-flex mt-5 mb-2'>
                    <h2>Hot recipes</h2>
                    <div className='flex-grow-1'>
                        <h2 className='text-end'><a href='#'><u>See all</u></a></h2>
                    </div>
                </div>
                <div className='row'>
                    <RecipeCard label='Easy Fish Tacos' image='/materials/hamburger.svg' bgColor='#F5D4C1' star={4.9} country='Mexico' description='Fish tacos are a favorite quick and easy weeknight meal....'/>
                    <RecipeCard label='Easy Fish Tacos' image='/materials/burger_drink.svg' bgColor='#C9EAFD' star={4.9} country='Mexico' description='Fish tacos are a favorite quick and easy weeknight meal....'/>
                    <RecipeCard label='Easy Fish Tacos' image='/materials/burger_drink.svg' bgColor='#D4FBAD' star={4.9} country='Mexico' description='Fish tacos are a favorite quick and easy weeknight meal....'/>
                </div>
                {/* NEW RECIPES */}
                <div className='d-flex mt-5 mb-2'>
                    <h2>New recipes</h2>
                    <div className='flex-grow-1'>
                        <h2 className='text-end'><a href='#'><u>See all</u></a></h2>
                    </div>
                </div>
                <div className='row'>
                    <RecipeCard label='Easy Fish Tacos' image='/materials/hamburger.svg' bgColor='#F5D4C1' star={4.9} country='Mexico' description='Fish tacos are a favorite quick and easy weeknight meal....'/>
                    <RecipeCard label='Easy Fish Tacos' image='/materials/burger_drink.svg' bgColor='#C9EAFD' star={4.9} country='Mexico' description='Fish tacos are a favorite quick and easy weeknight meal....'/>
                    <RecipeCard label='Easy Fish Tacos' image='/materials/burger_drink.svg' bgColor='#D4FBAD' star={4.9} country='Mexico' description='Fish tacos are a favorite quick and easy weeknight meal....'/>
                </div>
                <div style={{marginBlock:100}}></div>
            </div>
            
        </div>
        </LayoutMaster>
    )
};

export default Page;