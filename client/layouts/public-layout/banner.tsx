import Image from "next/image";

const BannerPublic = () => {
  return (
    <div className="w-full h-auto overflow-hidden">
      <Image
        className="w-full h-full object-cover"
        src="https://theme.hstatic.net/200000656863/1001222351/14/slider_1.jpg?v=377"
        alt="banner"
        layout="responsive"
        width={1920} // replace with the actual width of the image
        height={1080} // replace with the actual height of the image
      />
    </div>
  );
};

export default BannerPublic;
