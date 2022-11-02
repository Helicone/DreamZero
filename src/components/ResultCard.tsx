/* eslint-disable @next/next/no-img-element */
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
// import Swiper JS
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
// import Swiper styles
import 'swiper/css';
export function EmptyResultCard({
  prompt,
  onDelete,
}: {
  prompt: string;
  onDelete: () => void;
}) {
  return (
    <InternalResultCard
      image={
        <div className='my-2 flex h-40 w-full animate-pulse items-center justify-center bg-slate-300'>
          Loading...
        </div>
      }
      prompt={prompt}
      onDelete={onDelete}
    ></InternalResultCard>
  );
}

function InternalResultCard({
  image,
  prompt,
  onDelete,
}: {
  image: JSX.Element;
  prompt: string;
  onDelete: () => void;
}) {
  return (
    <div className='py-5'>
      <div className='overflow-hidden rounded-md border-t border-b border-gray-300 py-5 shadow-sm'>
        {image}
        <div className='px-5 pt-2'>
          <div className='flex flex-row justify-between'>
            <div>{prompt}</div>
            <button onClick={onDelete}>
              <TrashIcon className='h-5' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultCard({
  images,
  prompt,
  onDelete,
}: {
  images: string[];
  prompt: string;
  onDelete: () => void;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef<SwiperClass>();
  const Image = (
    <div className='relative'>
      <div className='pointer-events-none absolute top-1/2 z-20 flex w-full flex-row justify-between'>
        <button onClick={() => swiperRef.current?.slidePrev()}>
          <ArrowLeftCircleIcon className='pointer-events-auto h-8 pl-2 opacity-30' />
        </button>
        <button onClick={() => swiperRef.current?.slideNext()}>
          <ArrowRightCircleIcon className='pointer-events-auto h-8 pr-2 opacity-30' />
        </button>
      </div>
      <div className='pointer-events-none absolute right-0 left-0 bottom-3 z-20 ml-auto mr-auto flex w-max flex-row'>
        {Array.from(Array(images.length).keys()).map((i) => (
          <div
            key={i}
            className={`mx-1 my-2 h-2 w-2 rounded-full opacity-70 ${
              currentSlide === i ? 'bg-gray-300' : 'bg-gray-600'
            }`}
          ></div>
        ))}
      </div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {images.map((url) => (
          <SwiperSlide key={url}>
            <img src={url} alt='image not found' />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
  // TODO move to https://swiperjs.com/get-started
  return (
    <div className='py-5'>
      <div className='overflow-hidden rounded-md border-t border-b border-gray-300 py-5 shadow-sm'>
        <InternalResultCard image={Image} prompt={prompt} onDelete={onDelete} />
      </div>
    </div>
  );
}
