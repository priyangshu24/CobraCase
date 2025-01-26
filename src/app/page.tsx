/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
import MaxWidthWrapper from "@/app/component/MaxWidthWrapper";
import Phone from "./component/Phone";
import Image from "next/image";
import { Check } from "lucide-react";
import { Star } from "lucide-react";

export default function Home() {
  return (
  <div className=" bg-slate-50 ">
    <section>
      <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
        <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
          <div className="relative mx-auto text-center lg:text-left flex-col items-center lg:items-start">
            <div className="absoute w-28 left-0 -top-20 hidden lg:block">
              <img src="/snake-1.png" className="w-full"/>
            </div>
            <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !lending-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">Your Image on a <span className="bg-green-600 px-2">Custom</span>Phone Case</h1>
            <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
            Capture your best moments in a custom phone case,{' '}
              <span className="font-semibold">one-of-one</span>
              Phone case. CaseCobra makes it easy to turn your favorite photos into personalized phone cases.
            </p>

            <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start"> 
              <div className="space-y-2">
                <li className="flex gap-1.5 items-center text-left"> 
                  <Check className="w-5 h-5 shrink-0 text-green-600" />
                  High-quality, durable phone cases
                </li>
                <li className="flex gap-1.5 items-center text-left"> 
                  <Check className="w-5 h-5 shrink-0 text-green-600" />
                  7 year of print gutentee 
                </li>
                <li className="flex gap-1.5 items-center text-left"> 
                  <Check className="w-5 h-5 shrink-0 text-green-600" />
                  Modern iPhone and Android model compatible phone cases
                </li>
              </div>
            </ul>
            <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="flex -space-4-x-4">
                <img className="inline-block h-10 w-10 rounded-full ring-2
                ring-slate-100"
                src="/users/user-1.png"
                alt="user image"
                />
                <img className="inline-block h-10 w-10 rounded-full ring-2
                ring-slate-100"
                src="/users/user-2.png"
                alt="user image"
                />
                <img className="inline-block h-10 w-10 rounded-full ring-2
                ring-slate-100"
                src="/users/user-3.png"
                alt="user image"
                />
                <img className="inline-block h-10 w-10 rounded-full ring-2
                ring-slate-100"
                src="/users/user-4.jpg"
                alt="user image"
                />
                <img className="inline-block object-fill h-10 w-10 rounded-full ring-2
                ring-slate-100"
                src="/users/user-5.jpg"
                alt="user image"
                />
              </div>

              <div className="flex gap-0.5">
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
              </div>
              <p><span className="font-semibold text-green-600">4.8</span> <span className="text-gray-500">out of 5</span> <span className=" font-semibold text-green-600 ">10,000+</span>
              <span className="text-gray-500">  reviews</span>
               </p>
               <p className="text-green-600 font-semibold">20000+
               <span className="text-gray-500 font-normal"> Customer</span>
               </p>
            </div>
          </div>
        </div>

        <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit ">
          <div className="relative md:max-w-xl">
            
            <img 
            src="/your-image.png"
            alt="your image" 
            className="absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block"/>

            <img 
            src="/line.png" 
            className="absolute w-20 -left-6 -bottom-6 select-none"/>
            <Phone 
            imgSrc="/testimonials/1.jpg"
            className="w-64"/>
            
          </div>

        </div>
      </MaxWidthWrapper>
    </section>
  </div>
  );
}
