import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as CarouselContainer } from "react-responsive-carousel";
import Img from "./Img";
import { FileData } from "../services/file";

interface ICarousel {
  urls: FileData[];
  onClickItem?: (index: number) => void;
}

function Carousel({ urls, onClickItem = () => {} }: ICarousel) {
  return (
    <div className="rounded-md shadow-md">
      <CarouselContainer
        onClickItem={(index) => {
          onClickItem(index);
        }}
        showThumbs={false}
        dynamicHeight={true}
        statusFormatter={(c, t) => (t > 1 ? `${c}/${t}` : "")}
      >
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
            </div>
          );
        })}
      </CarouselContainer>
    </div>
  );
}

export default Carousel;
