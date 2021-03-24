// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles

import SwiperCore, { Autoplay, Pagination } from 'swiper';


SwiperCore.use([Autoplay,Pagination]);

export  default function Sponsers()  {
  return (
    <Swiper
      spaceBetween={15}
      slidesPerView={4}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      data-aos="fade-up"
      data-aos-easing="ease-in-out"
    //   data-aos-once="true"
      data-aos-delay="50"
      loop={true}    // zoom={true}
      centeredSlides={true}
      pagination={{ clickable: true }}
      setWrapperSize={true}
      scrollbar={{ draggable: true }}
      speed={1709}
      autoplay={{ delay: 1210 ,disableOnInteraction:false}}
      data-swiper-autoplay={2877}
      
    >
      <SwiperSlide><img src="/prakarsh2021-logo.png" alt="" style={{height:100, width:100,  }}/></SwiperSlide>
      <SwiperSlide><img src="/prakarsh2021-logo.png" alt="" style={{height:100, width:100,  }}/></SwiperSlide>
      <SwiperSlide><img src="/prakarsh2021-logo.png" alt="" style={{height:100, width:100,  }}/></SwiperSlide>
      <SwiperSlide><img src="/prakarsh2021-logo.png" alt="" style={{height:100, width:100,  }}/></SwiperSlide>
      <SwiperSlide><img src="/prakarsh2021-logo.png" alt="" style={{height:100, width:100,  }}/></SwiperSlide>
      <SwiperSlide><img src="/prakarsh2021-logo.png" alt="" style={{height:100, width:100,  }}/></SwiperSlide>
    
    </Swiper>
  );
};