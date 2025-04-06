import React from "react";
import Carousel from "react-multi-carousel";
import { responsive } from "./carousel-datas";

export default function CarouselCore({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Carousel
      swipeable
      draggable
      partialVisbile
      keyBoardControl
      autoPlay
      rewind={false}
      infinite
      rewindWithAnimation={false}
      focusOnSelect={false}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      responsive={responsive}
      itemClass=""
    >
      {children}
    </Carousel>
  );
}
