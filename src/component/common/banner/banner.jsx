import { Fragment } from "react";
import bannerImg1 from "/assets/images/banner-1.jpg";
import bannerImg2 from "/assets/images/banner-2.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <Fragment>
      {/* new banner part work start here */}
      <section className="p-0 pt-0 ">
        <Swiper
          navigation={true}
          loop={true}
          effect={'fade'}
          modules={[EffectFade, Autoplay, Navigation, Pagination]}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          className="mainBanner"
        >
          <SwiperSlide>
            <Link to='/'><img className="img-fluid" src={bannerImg1} alt="" /></Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to='/'><img className="img-fluid" src={bannerImg2} alt="" /></Link>
          </SwiperSlide>
        </Swiper>
      </section>
      {/* new banner part work end here */}
    </Fragment>
  );
};

export default Banner;