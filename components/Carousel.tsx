import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as CarouselContainer } from "react-responsive-carousel";

interface ICarousel {
  urls: string[];
}

function Carousel({ urls }: ICarousel) {
  return (
    <div className="rounded-md shadow-md">
      <CarouselContainer showThumbs={false} dynamicHeight={true}>
        {urls.map((url) => {
          return (
            <div key={url}>
              <img className="rounded-md" src={url} />
              {/* <p className="legend">Legend 1</p> */}
            </div>
          );
        })}
      </CarouselContainer>
    </div>
  );
}

export default Carousel;
