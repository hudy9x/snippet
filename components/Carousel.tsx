import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as CarouselContainer } from "react-responsive-carousel";
import Img from "./Img";
import { FileData } from "../services/file";

interface ICarousel {
  urls: FileData[];
}

function Carousel({ urls }: ICarousel) {
  return (
    <div className="rounded-md shadow-md">
      <CarouselContainer showThumbs={false} dynamicHeight={true}>
        {urls.map(({ fullPath, url, height, width }) => {
          return (
            <div key={fullPath}>
              <Img
                className="rounded-md"
                src={url}
                alt={url}
                width={width}
                height={height}
              />
              {/* <img className="rounded-md" src={url} /> */}
              {/* <p className="legend">Legend 1</p> */}
            </div>
          );
        })}
      </CarouselContainer>
    </div>
  );
}

export default Carousel;
