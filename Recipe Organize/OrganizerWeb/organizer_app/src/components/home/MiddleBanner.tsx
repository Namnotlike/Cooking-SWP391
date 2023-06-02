'use client';
import Image from 'next/image';
const MiddleBanner = () => {
  return (
    <div className="row" style={{paddingInline:150}}>
      <div className="col-12 col-sm-6">
        <Image src="/materials/middle_banner.svg" width={0} height={0} style={{width:'100%',height:'auto'}} alt="Picture of the author" />
      </div>
      <div className="col-12 col-sm-6 d-flex align-items-center">
          <div>
            <b style={{fontSize:18}}>THE FOOD</b>
            <h1 style={{fontSize:64}} className='py-3'>Why Us?</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt </p>
            <ul>
              <li className='py-2'>Fresh Ingrediants from <span style={{color:'#FC8800'}}>local</span> farms</li>
              <li className='py-2'>Simple to make recipes <span style={{color:'#FC8800'}}>delivered</span> to you</li>
            </ul>
            <button className='btn text-light' style={{backgroundColor:'#FC8800'}}>Try Now</button>
          </div>
      </div>
    </div>
  )
}

export default MiddleBanner;