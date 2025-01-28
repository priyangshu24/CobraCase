/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
import MaxWidthWrapper from "@/app/component/MaxWidthWrapper";
import Phone from "./component/Phone";
import Image from "next/image";
import { Check } from "lucide-react";
import { Star } from "lucide-react";
import { Icons } from "@/components/icons";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex-col items-center lg:items-start">
              <div className="absoute w-28 left-0 -top-20 hidden lg:block">
                <img src="/snake-1.png" className="w-full"/>
              </div>
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !lending-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                Your Image on a <span className="bg-green-600 px-2">Custom</span>Phone Case
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Capture your best moments in a custom phone case,{' '}
                <span className="font-semibold">one-of-one</span> Phone case. 
                CaseCobra makes it easy to turn your favorite photos into personalized phone cases.
              </p>

              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="w-5 h-5 shrink-0 text-green-600" />
                    High-quality, durable phone cases
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="w-5 h-5 shrink-0 text-green-600" />
                    7 year of print guarantee
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="w-5 h-5 shrink-0 text-green-600" />
                    Modern iPhone and Android model compatible phone cases
                  </li>
                </div>
              </ul>

              <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex -space-4-x-4">
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-1.png"
                    alt="Sarah M."
                  />
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-2.png"
                    alt="Michael R."
                  />
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-3.png"
                    alt="Emma L."
                  />
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-4.png"
                    alt="David K."
                  />
                  <img className="inline-block object-fill h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-5.png"
                    alt="Jessica W."
                  />
                </div>

                <div className="flex gap-0.5">
                  <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                  <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                  <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                  <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                  <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                </div>
                <p>
                  <span className="font-semibold text-green-600">4.8</span>{' '}
                  <span className="text-gray-500">out of 5</span>{' '}
                  <span className="font-semibold text-green-600">10,000+</span>
                  <span className="text-gray-500"> reviews</span>
                </p>
                <p className="text-green-600 font-semibold">
                  20000+
                  <span className="text-gray-500 font-normal"> Customers</span>
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
            <div className="relative md:max-w-xl">
              <img 
                src="/your-image.png"
                alt="your image"
                className="absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block"
              />
              <img 
                src="/line.png"
                className="absolute w-20 -left-6 -bottom-6 select-none"
              />
              <Phone 
                imgSrc="/testimonials/1.jpg"
                className="w-64"
              />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Value proposition section */}
      <section className="bg-slate-100 py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col items-center gap-4 sm:gap-6">
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
              What our{' '}
              <span className="relative px-2">
                customers{' '}
                <Icons.underline className="hideden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-600"/>
              </span>{' '}
              say
            </h2>
            <img src="/snake-2.png" className="w-24 order-0 lg:order-2"/>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16 gap-x-8">
            {/* First Review */}
            <div className="flex flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
              </div>
              <p>
                "I'm absolutely in love with my custom phone case! <span className="p-0.5 bg-slate-800 text-white rounded-md">The image quality is stunning</span> - every detail of my vacation photo came through perfectly. The case has already survived a few drops, and both the case and image still look brand new."
              </p>
              <div className="flex gap-4 mt-2">
                <img className="rounded-full h-12 w-12 object-cover"
                  src="/users/user-1.png"
                  alt="Sarah Mitchell" />
                <div className="flex flex-col">
                  <p className="font-semibold">Sarah Mitchell</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600"/>
                    <p className="text-sm">Verified buyer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Review */}
            <div className="flex flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
              </div>
              <p>
                "As a photographer, I'm quite picky about print quality. <span className="p-0.5 bg-slate-800 text-white rounded-md">The color accuracy is impressive</span>. After 6 months of daily use, there's no fading or scratching. The case provides great protection while showing off my work beautifully."
              </p>
              <div className="flex gap-4 mt-2">
                <img className="rounded-full h-12 w-12 object-cover"
                  src="/users/user-2.png"
                  alt="Michael Rodriguez" />
                <div className="flex flex-col">
                  <p className="font-semibold">Michael Rodriguez</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600"/>
                    <p className="text-sm">Verified buyer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Third Review */}
            <div className="flex flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
              </div>
              <p>
                "Got this for my new iPhone and I'm impressed! <span className="p-0.5 bg-slate-800 text-white rounded-md">The fit is perfect</span> and the buttons are super responsive. The image of my dog looks exactly like the photo I uploaded. Great quality and fast shipping too!"
              </p>
              <div className="flex gap-4 mt-2">
                <img className="rounded-full h-12 w-12 object-cover"
                  src="/users/user-3.png"
                  alt="Emma Lewis" />
                <div className="flex flex-col">
                  <p className="font-semibold">Emma Lewis</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600"/>
                    <p className="text-sm">Verified buyer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fourth Review */}
            <div className="flex flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
              </div>
              <p>
                "This is my third case from CaseCobra and they never disappoint. <span className="p-0.5 bg-slate-800 text-white rounded-md">The print quality keeps getting better</span>. Love how my family photo turned out on this one. The edges are well-protected and the case feels premium."
              </p>
              <div className="flex gap-4 mt-2">
                <img className="rounded-full h-12 w-12 object-cover"
                  src="/users/user-4.jpg"
                  alt="David Kim" />
                <div className="flex flex-col">
                  <p className="font-semibold">David Kim</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600"/>
                    <p className="text-sm">Verified buyer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fifth Review */}
            <div className="flex flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
                <Star className="w-4 h-4 shrink-0 text-green-600 fill-green-600"/>
              </div>
              <p>
                "Received my customized case yesterday and I'm already getting compliments! <span className="p-0.5 bg-slate-800 text-white rounded-md">The matte finish is beautiful</span> and the image quality exceeded my expectations. Worth every penny for protecting my phone in style."
              </p>
              <div className="flex gap-4 mt-2">
                <img className="rounded-full h-12 w-12 object-cover"
                  src="/users/user-5.jpg"
                  alt="Jessica Wong" />
                <div className="flex flex-col">
                  <p className="font-semibold">Jessica Wong</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600"/>
                    <p className="text-sm">Verified buyer</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}