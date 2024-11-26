import {useTranslation} from 'react-i18next'
import {
    FaCar,
    FaHamburger,
    FaHotel,
    FaMapMarkedAlt,
    FaPassport,
    FaTicketAlt,
} from 'react-icons/fa'
import {Container} from '../ui/Container.jsx'
import CustomTitle from '../ui/CustomTitle.jsx'

export const Services = () => {
    const {t} = useTranslation();
    const content = [
        // eslint-disable-next-line react/jsx-key
        <FaMapMarkedAlt className='w-[50px] h-[50px] text-[#f5b31c]'/>,
        // eslint-disable-next-line react/jsx-key
        <FaPassport className='w-[50px] h-[50px] text-[#f5b31c]'/>,
        // eslint-disable-next-line react/jsx-key
        <FaCar className='w-[50px] h-[50px] text-[#f5b31c]'/>,
        // eslint-disable-next-line react/jsx-key
        <FaHamburger className='w-[50px] h-[50px] text-[#f5b31c]'/>,
        // eslint-disable-next-line react/jsx-key
        <FaTicketAlt className='w-[50px] h-[50px] text-[#f5b31c]'/>,
        // eslint-disable-next-line react/jsx-key
        <FaHotel className='w-[50px] h-[50px] text-[#f5b31c]'/>,
    ];
    return (
        <section id='services' className={"py-32"}>
            <Container>
                <CustomTitle tag={"h2"} text={"services.title"} className={"text-center"}/>
                <div className='grid lg:grid-cols-3 grid-flow-col-1 justify-center gap-5 pt-10'>
                    {
                        content.map((item, key) => (
                            <div key={key}
                                 className='flex items-center text-center gap-2 flex-col bg-white rounded-3xl p-5'>
                                {item}
                                <p className={"text-2xl"}>{t(`services.services.${key}.title`)}</p>
                                <p className={"text-sm"}>{t(`services.services.${key}.text`)}</p>
                            </div>
                        ))
                    }
                </div>
            </Container>
        </section>
    )
}
