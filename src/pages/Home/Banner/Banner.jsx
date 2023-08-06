import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../../assets/banner/13.jpg'
import img2 from '../../../assets/banner/11.jpg'
import img3 from '../../../assets/banner/07.jpg'
import img4 from '../../../assets/banner/16.jpg'
import img5 from '../../../assets/banner/06.jpg'
import img6 from '../../../assets/banner/09.jpg'

const Banner = () => {
    return (
        <div>
            <Carousel>
                <div>
                    <img src={img1} />
                </div>
                <div>
                    <img src={img2} />
                </div>
                <div>
                    <img src={img3} />
                </div>
                <div>
                    <img src={img4} />
                </div>
                <div>
                    <img src={img5} />
                </div>
                <div>
                    <img src={img6} />
                </div>

            </Carousel>
        </div>
    );
};

export default Banner;