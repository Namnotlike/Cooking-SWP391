import Image from 'next/image';
import Link from 'next/link';
const MiddleBanner = () => {
  return (
    <div className="row px-0 px-sm-5 mx-0 mx-sm-5">
      <div className="col-12 col-sm-6">
        <Image src="/materials/middle_banner.svg" width={0} height={0} style={{width:'100%',height:'auto'}} alt="Picture of the author" />
      </div>
      <div className="col-12 col-sm-6 d-flex align-items-center my-3">
          <div>
            <b style={{fontSize:18}}>THE FOOD</b>
            <h1 style={{fontSize:64}} className='py-3'>Why Us?</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt </p>
            <ul>
              <li className='py-2'>Fresh Ingrediants from <span style={{color:'#FC8800'}}>local</span> farms</li>
              <li className='py-2'>Simple to make recipes <span style={{color:'#FC8800'}}>delivered</span> to you</li>
            </ul>
            <Link href={"/category/1"}><button className='btn btn-outline-orange' >Try Now</button></Link>
          </div>
      </div>
    </div>
  )
}

export default MiddleBanner;