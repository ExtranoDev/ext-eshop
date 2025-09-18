"use client";

import { Cart, Product } from "@/types";
import ProductCard from "@/components/shared/product/product-card";

// Import Swiper React components and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ProductList = ({
  data,
  title,
  limit,
  cart,
}: {
  data: Product[];
  title?: string;
  limit?: number;
  cart: Cart;
}) => {
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <div className="py-8 lg:py-12 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-10 tracking-wider">
          {title}
        </h2>
        {data.length > 0 ? (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={2}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            className="mySwiper"
          >
            {limitedData.map((product: Product) => (
              <SwiperSlide key={product.slug}>
                <ProductCard product={product} cart={cart} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-gray-700 rounded-lg shadow-inner">
            <p className="text-2xl font-semibold text-gray-400 dark:text-gray-500 mb-2">
              Uh oh!
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              It seems we&apos;re all out of products here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
