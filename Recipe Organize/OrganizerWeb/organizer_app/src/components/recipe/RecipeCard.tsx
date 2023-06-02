import Image from 'next/image';
import StarRateIcon from '@mui/icons-material/StarRate';
import CircleIcon from '@mui/icons-material/Circle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from 'react';

type Params = {
    bgColor: string,
    label: string,
    star: number,
    country: string,
    description: string,
    image: string,
}

const RecipeCard = ({label, bgColor, star, country, description, image}: Params) => {
    const [loved,setLoved] = React.useState(false);

    return (
        <div className='col-4'>
            <div className='p-5' style={{position:'relative',border:'2px solid lightgray',borderRadius:20,backgroundColor:bgColor}}>
                <div style={{position:'absolute',top:20,right:20, cursor:'pointer'}} onClick={()=>setLoved(!loved)}>
                    {loved && (<FavoriteIcon sx={{color:'red'}} />) || (<FavoriteBorderIcon />)}
                </div>
                <div>
                    <Image src={image} width={0} height={0} style={{width:'100%',height:'auto'}} alt="Picture of the author" />
                    <h3>{label}</h3>
                    <div className='d-flex align-items-center'>
                        <StarRateIcon className='text-warning' sx={{fontSize:24}} />
                        <span className='mx-2'>{star}</span>
                        <CircleIcon sx={{color:'white',fontSize:16}} />
                        <span className='mx-2' >{country}</span>
                    </div>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
};

export default RecipeCard;