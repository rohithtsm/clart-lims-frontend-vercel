import { Fragment, useEffect, useState } from "react";
import bannerImg1 from "/assets/images/banner1.jpg";
import bannerImg2 from "/assets/images/banner2.jpg";
import bannerImg3 from "/assets/images/banner3.jpg";

import iconSafe from "/assets/images/safe.png";
import iconPickUp from "/assets/images/pick-up.png";
import iconViewReports from "/assets/images/reports.png";
import iconDoctor from "/assets/images/doctor.png";
import iconBestPrices from "/assets/images/best-prices.png";

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
      <section className="p-0 pt-5 ">
        <article className="container">
          <aside className="row">
            <div className="col-md-6">
            {/* Swiper banner work start here */}
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
                  <Link to='/'><img className="img-fluid rounded-3" src={bannerImg1} alt="" /></Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link to='/'><img className="img-fluid rounded-3" src={bannerImg2} alt="" /></Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link to='/'><img className="img-fluid rounded-3" src={bannerImg3} alt="" /></Link>
                </SwiperSlide>
              </Swiper>
              {/* Swiper banner work end here */}
            </div>
            <div className="col-md-6">
              <div className="bannerText">
                <h3 className="text-dark"><b>Lab Test From The Comfort Of Your Home</b></h3>
                <p className="fs-6">Trusted by 200 Hundred satisfied customers | 25+ lab tests booked</p>
                <ul className="servicesListBx">
                  <li>
                    <img src={iconSafe} alt="" />
                    <p align="center">100% Safe & Hygienic</p>
                  </li>
                  <li>
                    <img src={iconPickUp} alt="" />
                    <p align="center">Home Sample Pick Up</p>
                  </li>
                  <li>
                    <img src={iconViewReports} alt="" />
                    <p align="center">View Reports Online</p>
                  </li>
                  <li>
                    <img src={iconDoctor} alt="" />
                    <p align="center">100% Accuracy Guaranteed</p>
                  </li>
                  <li>
                    <img src={iconBestPrices} alt="" />
                    <p align="center">Best Prices Guaranteed</p>
                  </li>
                </ul>
                <Link to="/health-packages" className="btn btn-solid btn-primary mt-1">VIEW POPULAR PACKAGES</Link>
              </div>
            </div>
          </aside>
        </article>
      </section>
      {/* new banner part work end here */}

    </Fragment>
  );
};

export default Banner;