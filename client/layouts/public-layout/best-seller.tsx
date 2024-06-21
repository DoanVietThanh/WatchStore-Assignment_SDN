import React from "react";
import Image from "next/image";

const BestSeller = () => {
  return (
    <div className="flex items-center p-8 gap-6">
      <div className="flex flex-col text-center gap-4">
        <p>Feature</p>
        <h1 className="capitalize font-serif text-3xl">Best Sellers</h1>
        <p>Meet our customer favorites</p>
      </div>
      <div className="flex-1 h-full flex gap-6 justify-evenly">
        {[1, 2, 3].map((item) => (
          <div key={item} className="border text-center p-4 rounded-md shadow-md">
            <div className="mb-4">
              <Image
                src="https://citizenwatch.widen.net/content/c155b5cxmk/png/%E2%80%9CTSUYOSA%E2%80%9D.png?u=41zuoe&width=400&height=400&quality=80&crop=false&keep=c&color=FFFFFF00"
                alt="watch"
                width={200}
                height={200}
                layout="intrinsic"
              />
            </div>
            <h1 className="text-2xl font-serif">Sport Luxury</h1>
            <p className="text-md mt-2">Atomic timekeeping</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
