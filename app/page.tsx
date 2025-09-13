import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen grid place-content-center  text-white ">
      <section className="max-w-xl flex flex-col items-center text-center">
        <Image width={64} height={64} alt="logo" src={"/logo.png"} />

        <h1 className="text-8xl text-primary tracking-tighter  title">
          Brandle
        </h1>
        <p className="text-3xl mt-2">Guess the unique brand</p>
        <p className="text-theme-light-gray mt-4 mb-24">
          Compete with thousands of other players in the daily challenge, or try
          Quick Play and see from over 5000 unique and exciting dishes from
          across the globe.
        </p>
        <Link href={"/game"} className="relative group overflow-clip">
          <div className="absolute bg-primary w-full h-full top-0 -left-60 group-hover:left-0 transition-all -z-10 duration-300"></div>

          <button className=" h-fit cursor-pointer border font-semibold w-fit group-hover:text-black border-theme-gray   text-primary px-20 py-4 transition-all duration-300">
            PLAY NOW
          </button>
        </Link>
      </section>
    </div>
  );
}
