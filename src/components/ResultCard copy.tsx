import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/outline';
import { useRef } from 'react';
// import Swiper JS
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
// import Swiper styles
import 'swiper/css';

export default function ResultCard({
  images,
  prompt,
}: {
  images: string[];
  prompt: string;
}) {
  const swiperRef = useRef<SwiperClass>();
  // TODO move to https://swiperjs.com/get-started
  console.log(swiperRef.current?.activeIndex ?? 0);
  return (
    <div className='py-5'>
      <div className='overflow-hidden rounded-md border-t border-b border-gray-300 py-5 shadow-sm'>
        <div className='relative'>
          <div className='absolute top-1/2 z-20 flex w-full flex-row justify-between'>
            <button onClick={() => swiperRef.current?.slidePrev()}>
              <ArrowLeftCircleIcon className='h-8 pl-2 opacity-30' />
            </button>
            <button onClick={() => swiperRef.current?.slideNext()}>
              <ArrowRightCircleIcon className='h-8 pr-2 opacity-30' />
            </button>
          </div>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {images.map((url) => (
              <SwiperSlide key={url}>
                <img src={url} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className='px-5 pt-2'>Hello</div>
      </div>
    </div>
  );
}
