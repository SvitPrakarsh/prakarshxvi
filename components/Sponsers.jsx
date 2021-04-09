import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';

SwiperCore.use([Autoplay]);

export default function Sponsers() {
	return (
		// <Swiper
		//   spaceBetween={15}
		//   slidesPerView={4}
		//   data-aos="fade-up"
		//   data-aos-easing="ease-in-out"
		//   data-aos-delay="50"
		//   loop={true}
		//   centeredSlides={true}
		//   setWrapperSize={true}
		//   scrollbar={{ draggable: true }}
		//   speed={1709}
		//   autoplay={{ delay: 1210, disableOnInteraction: false }}
		//   data-swiper-autoplay={2877}
		// >
		//   <SwiperSlide>
		//     <img
		//       src="/prakarsh-logo.svg"
		//       alt=""
		//       style={{ height: 100, width: 100 }}
		//     />
		//   </SwiperSlide>
		// </Swiper>
		<>
			<div id="sponsers">
				<img src="/codingblocks.png" alt="" height="100px" />
				<img src="/counsellab.png" alt="" height="120px" />
			</div>
		</>
	);
}
