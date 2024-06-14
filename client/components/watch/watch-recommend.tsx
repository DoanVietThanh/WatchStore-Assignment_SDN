import React from "react";

const WatchRecommend = () => {
  return (
    <div>
      <h3 className="text-2xl font-semibold capitalize">You may also like</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="border">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchRecommend;
