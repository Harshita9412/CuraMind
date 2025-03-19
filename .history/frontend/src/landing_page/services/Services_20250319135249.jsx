import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import Card from './Card';
import Features from './Features';
import { CSSTransition } from 'react-transition-group';
import './Services.css';

const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`slider-arrow prev-arrow ${className}`}
            style={{ ...style }}
            onClick={onClick}
        >
            <i className="fa-solid fa-arrow-left"></i>
        </div>
    );
};

const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`slider-arrow next-arrow ${className}`}
            style={{ ...style }}
            onClick={onClick}
        >
            <i className="fa-solid fa-arrow-right"></i>
        </div>
    );
};

const Services = () => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const nodeRef = useRef(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/services`)


                
                setServices(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        fetchServices();
    }, []);

    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    const handleCardClick = (service) => {
        setSelectedService(service);
    };

    return (
        <div className="services">
            <CSSTransition
                in={!selectedService}
                timeout={500}
                classNames="fade"
                unmountOnExit
                nodeRef={nodeRef}
            >
                <div ref={nodeRef} className="heading" id="services_text">
                    discover the right <br />
                    <b>support for your journey</b>
                </div>
            </CSSTransition>

            {selectedService ? (
                <Features service={selectedService} />
            ) : (
                <>
                    <div className="slider-container">
                        <Slider {...settings}>
                            {services.slice(0, 3).map((service) => (
                                <div
                                    key={service._id}
                                    className="col-12 col-md-4 col-lg-4 mb-4"
                                >
                                    <Card
                                        image={service.image}
                                        title={service.name}
                                        onClick={() => handleCardClick(service)}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>

                    <div className="slider-container">
                        <Slider {...settings}>
                            {services.slice(3, 6).map((service) => (
                                <div
                                    key={service._id}
                                    className="col-12 col-md-4 col-lg-4 mb-4"
                                >
                                    <Card
                                        image={service.image}
                                        title={service.name}
                                        onClick={() => handleCardClick(service)}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </>
            )}
        </div>
    );
};

export default Services;
