import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
const Footer = () => {
    return (
        <div className='row' style={{borderTop:'1px solid black'}}>
            {/* LEFT FOOTER VIEWS */}
            <div className='col-12 col-sm-4 p-5'>
                <Image src="/materials/icon_hat_cooker.svg" width={50} height={50} alt="Picture of the author" />
                <span style={{marginLeft:20}}>RECIPE ORGANIZER</span>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
            </div>
            {/* CENTER FOOTER VIEWS */}
            <div className='col-12 col-sm-4 d-flex justify-content-center align-items-center'>
                <p>@ 2023 Recipe Organizer. All Rights Reserved.</p>
            </div>
            {/* RIGHT FOOTER VIEWS */}
            <div className='col-12 col-sm-4 d-flex justify-content-end align-items-center'>
                <Image src="/materials/logo_instagram.svg" width={35} height={35} alt="Picture of the author" className='me-3' />
                <Image src="/materials/logo_twitter.svg" width={35} height={35} alt="Picture of the author" className='me-3' />
            </div>
        </div>
    );
};

export default Footer;