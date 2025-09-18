"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

// Static target date (replace with desired date)
const TARGET_DATE = new Date("2025-12-20T00:00:00");

// Function to calculate the time remaining
const calculateTimeRemaining = (targetDate: Date) => {
  const currentTime = new Date();
  const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0);

  return {
    days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ),
    minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
  };
};

const DealCountdown = () => {
  const [time, setTime] = useState<ReturnType<typeof calculateTimeRemaining>>();
  useEffect(() => {
    // Calculate initial time on client
    setTime(calculateTimeRemaining(TARGET_DATE));

    const timerInterval = setInterval(() => {
      const newTime = calculateTimeRemaining(TARGET_DATE);
      setTime(newTime);

      if (
        newTime.hours === 0 &&
        newTime.hours === 0 &&
        newTime.minutes === 0 &&
        newTime.seconds === 0
      ) {
        clearInterval(timerInterval);
      }

      return () => clearInterval(timerInterval);
    }, 1000);
  }, []);

  if (!time) {
    return (
      <section className="bg-gradient-to-r from-purple-200 to-pink200 text-white py-12 px-6 shadow-xl my-20">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-extrabold animate-pulse">
            Loading countdown...
          </h3>
        </div>
      </section>
    );
  }

  if (
    time.hours === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0
  ) {
    return (
      <section className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-6 px-3 md:py-12 md:px-6 shadow-xl my-10 md:my-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h3 className="text-4xl font-extrabold text-red-500">
              Deal has Ended
            </h3>
            <p className="text-lg">
              This deal is no longer available. Explore our exciting new
              promotions!
            </p>
            <div className="mt-4">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/search">View Products</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="/images/promo.jpg"
              alt="promotion"
              width={400}
              height={300}
              className="rounded-lg shadow-lg object-cover w-full h-auto max-w-sm"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-6 px-4 md:py-12 md:px-6 shadow-2xl my-10 md:my-20 relative overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="flex flex-col gap-4 md:gap-6 text-center md:text-left">
          <span className="text-lg md:text-xl font-semibold tracking-wide uppercase">
            Limited Time Offer
          </span>
          <h3 className="text-4xl lg:text-6xl font-extrabold leading-tight">
            Deal Of The Month
          </h3>
          <p className="text-lg md:text-xl lg:text-2xl font-light">
            Don&apos;t miss out on this incredible deal! Unlock amazing savings
            and exclusive perks before time runs out. 🛍️✨
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2 md:mt-4">
            <StatBox label="Days" value={time.days} />
            <StatBox label="Hours" value={time.hours} />
            <StatBox label="Minutes" value={time.minutes} />
            <StatBox label="Seconds" value={time.seconds} />
          </ul>
          <div className="mt-4">
            <Button
              asChild
              className="bg-white text-purple-600 font-bold text-lg py-3 px-8 rounded-full hover:bg-gray-100 transition-transform transform hover:scale-105"
            >
              <Link href="/search">Shop Now</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center animate-fadeIn">
          <Image
            src="/images/promo.jpg"
            alt="promotion"
            width={500}
            height={400}
            className="rounded-xl shadow-2xl object-cover w-full h-auto max-w-sm md:max-w-lg"
          />
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10 backdrop-filter backdrop-blur-sm z-0"></div>
    </section>
  );
};

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-lg backdrop-filter backdrop-blur-md shadow-lg transition-transform transform hover:scale-105 duration-300">
    <p className="text-3xl lg:text-5xl font-extrabold leading-none">
      {String(value).padStart(2, "0")}
    </p>
    <p className="text-sm font-semibold mt-1 tracking-wider uppercase opacity-80">
      {label}
    </p>
  </li>
);

export default DealCountdown;
