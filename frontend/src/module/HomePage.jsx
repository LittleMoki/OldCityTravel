import {Header} from '../components/Header'
import {Hero} from '../components/Hero'
import {About} from '../components/About'
import {WhyUs} from '../components/WhyUs'
import {Services} from '../components/Services'
import {TravelDirections} from '../components/TravelDirections'
import {Map} from '../components/Map'
import {Footer} from '../components/Footer'

export const HomePage = () => {
    return (
        <>
            <Header/>
            <main>
                <Hero/>
                <About/>
                <WhyUs/>
                <TravelDirections/>
                <Services/>
                <Map/>
            </main>
            <Footer/>
        </>
    )
}
