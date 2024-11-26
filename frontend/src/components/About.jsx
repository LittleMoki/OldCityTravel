import {useTranslation} from 'react-i18next'
import {Button} from '../ui/button.jsx'
import {Container} from '../ui/Container.jsx'
import about_photo_1 from "../assets/52891432998_630185b2ee_k.jpg"
import about_photo_2 from "../assets/46889587444_d886f8b576_k.jpg"
import {LazyLoadImage} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import CustomTitle from "../ui/CustomTitle.jsx";

export const About = () => {
    const {t} = useTranslation();

    return (
        <section id="about" className={"mt-20"}>
            <Container>
                <div className='grid lg:grid-cols-[1fr_40%] lg:flex-row items-center flex-col-reverse sm:gap-20 gap-5'>
                    <div className="relative w-full h-full">
                        <LazyLoadImage
                            effect='blur'
                            src={about_photo_1}
                            alt='about-page'
                            className='w-full h-full rounded-3xl object-cover'
                            wrapperClassName="w-full h-full max-w-[300px] max-h-[300px] absolute bottom-[50px] right-0 z-10"
                        />
                        <LazyLoadImage
                            effect='blur'
                            src={about_photo_2}
                            alt='about-page'
                            className='w-full h-full rounded-3xl object-cover aspect-[5/6]'
                            wrapperClassName="w-full h-full absolute max-w-[400px] max-h-[400px] top-0 left-[50px]"
                        />
                    </div>
                    <div className='flex flex-col gap-10 items-start'>
                        <CustomTitle tag="h2" text="about.title"/>
                        <div className='sm:text-lg text-base'>
                            {t("about.subtitle", {returnObjects: true})
                                .map((elem, key) => <p key={key}
                                                       className="mb-3">{elem}</p>)}
                        </div>
                        <Button>
                            {t('call_button')}
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    )
}
