import LayoutMaster from "@/components/LayoutMaster";
import CarouselBanner from "@/components/home/CarouselBanner";
import Divider from "@/components/home/Divider";
import MiddleBanner from "@/components/home/MiddleBanner";
import ReviewCard from "@/components/home/ReviewCard";

const Page = () => {
  return (
    <LayoutMaster>
      <div>
        <CarouselBanner />
        <MiddleBanner />
        <Divider label="Best recipe" />
        <ReviewCard />
        <div style={{marginBlock:100}}></div>
      </div>
    </LayoutMaster>
  );
}

export default Page;