import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
const TopBar = () => {
    return (
        <div style={{blockSize:50,position:'fixed',top:0,left:0,width:'100%',zIndex:10}}>
            <div className="d-flex align-items-center px-2">
                {/* LOGO */}
                <Image src="/materials/icon_hat_cooker.svg" width={50} height={50} alt="Picture of the author" />
                {/* LEFT VIEWS */}
                <span style={{marginLeft:20}}>RECIPE ORGANIZER</span>
                <div style={{marginLeft:30}}>
                    <a href='../home' className="navi-link"><span className='navi_top'>Home</span></a>
                    <a href='../recipe' className="navi-link"><span className='navi_top'>Recipe</span></a>
                    <a href='../meal-planning' className="navi-link"><span className='navi_top'>Meal Planning</span></a>
                </div>
                {/* RIGHT VIEWS */}
                <div className='flex-grow-1 text-end'>
                    <input type='text' placeholder='Seach' className='place_right px-2' style={{border:'none',borderBottom:'2px solid black',outline: 'none',backgroundColor:'transparent'}}/>
                    <SearchIcon className='mx-2' style={{cursor:'pointer'}} />
                    <button className='btn text-light' style={{backgroundColor:'#FC8800',marginLeft:40}} onClick={()=>{location.href="../login"}}>Log In</button>
                </div>
                
            </div>
        </div>
    );
};

export default TopBar;