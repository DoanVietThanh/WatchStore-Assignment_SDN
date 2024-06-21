import Image from "next/image";

const BannerPublic = () => {
  return (
    <div className="w-full h-auto overflow-hidden shadow-lg rounded-lg">
      <Image
        className="w-full h-full object-cover"
        src="https://theme.hstatic.net/200000656863/1001222351/14/slider_1.jpg?v=377"
        alt="banner"
        layout="responsive"
        width={1920}
        height={1080}
      />
    </div>
  );
};

export default BannerPublic;
