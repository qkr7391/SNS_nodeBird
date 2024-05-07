import React, { useState } from 'react';
import PropTypes from "prop-types";
import Slick from 'react-slick';

import { Overlay, Global, Header, CloseBtn, ImgWrapper, Indicator, SlickWrapper } from "./styles";

const ImagesZoom = ({ images, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    return(
        <Overlay>
            <Global />
            <div>
                <Header>
                    <h1>Image Detail</h1>
                    <CloseBtn onClick={onClose}>X</ CloseBtn>
                </Header>
                <SlickWrapper>
                    <div>
                        <Slick
                        initialSlide={0}
                        beforeChange={(slide) => setCurrentSlide(slide)}
                        infinite
                        arrows ={false}
                        slidesToShow={1}
                        slidesToScroll={1}
                        >
                            {images.map((v)=> (
                                <ImgWrapper key={v.src}>
                                    <img src={`http://localhost:3065/${v.src}`} alt={v.src} />
                                </ImgWrapper>
                            ))}
                        </Slick>
                        <Indicator>
                            <div>
                                {currentSlide + 1}
                                {' '}
                                /
                                {' '}
                                {images.length}
                            </div>
                        </Indicator>
                    </div>
                </SlickWrapper>
            </div>
        </Overlay>
    );
}

ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;