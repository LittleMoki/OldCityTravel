import {Swiper, SwiperSlide} from 'swiper/react'

import {useTranslation} from 'react-i18next'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {Autoplay, EffectFade} from 'swiper/modules'
import bg2 from '../assets/2986c598176097.5ed667624a051.jpg'
import bg from '../assets/58286198176097.5ed6676247b29.webp'
import bg1 from '../assets/db55bf98176097.5ed667624cc20.webp'
import {Button} from '../ui/button.jsx'
import CustomTitle from "../ui/CustomTitle.jsx";

export const Hero = () => {
    const {t} = useTranslation()
    return (
        <section className='relative w-full h-screen'>
            <div className='absolute w-full h-full z-10 text-white'>
                <div className='container px-2 mx-auto h-full'>
                    <div
                        className='max-w-[800px] mx-auto flex h-full flex-col justify-center items-center text-center gap-4'>
                        <CustomTitle tag="h1" text="hero.title"/>
                        <p className='sm:text-xl text-base'>{t('hero.subtitle')}</p>
                        <div className="flex gap-5">
                            <Button
                                color={"secondary"}
                            >
                                {t('hero.button_1')}
                            </Button>
                            <Button>
                                {t('call_button')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Swiper
                effect={'fade'}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                modules={[EffectFade, Autoplay]}
                className='absolute top-0 left-0 w-full h-full brightness-75'
            >
                <SwiperSlide
                    style={{
                        backgroundImage: `url("${bg}")`,
                    }}
                    className='bg-cover bg-center h-full'
                ></SwiperSlide>
                <SwiperSlide
                    style={{
                        backgroundImage: `url("${bg1}")`,
                    }}
                    className='bg-cover bg-center h-full'
                ></SwiperSlide>
                <SwiperSlide
                    style={{
                        backgroundImage: `url("${bg2}")`,
                    }}
                    className='bg-cover bg-center h-full'
                ></SwiperSlide>
            </Swiper>
            <div
                className='absolute top-0 left-0 w-full h-full z-[6]'
                style={{
                    backgroundImage:
                        'linear-gradient(180deg, #141E3000 30%, #141E30 100%)',
                }}
            ></div>
            <div
                className='absolute top-0 left-0 w-full h-full z-[6]'
                style={{
                    backgroundImage:
                        'linear-gradient(360deg, #141E3000 60%, #141E30 100%)',
                }}
            ></div>
        </section>
    )
}
