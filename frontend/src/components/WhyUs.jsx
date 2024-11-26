import { Container } from '../ui/Container.jsx'
import 'react-lazy-load-image-component/src/effects/blur.css'
import CustomTitle from '../ui/CustomTitle.jsx'
import { useTranslation } from 'react-i18next'

export const WhyUs = () => {
	const { t } = useTranslation()
	return (
		<section className='my-20 bg-[#6E8F0B] p-10 text-white'>
			<Container>
				<CustomTitle
					tag='h2'
					text='whyUs.title'
					className={'text-center mb-28'}
				/>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-20'>
					{t('whyUs.advantages', { returnObjects: true }).map((elem, key) => (
						<div
							key={key}
							className='text-center w-full h-full relative text-black'
						>
							<div
								className={
									'shadow absolute top-[-50px] left-0 right-0 flex items-center justify-center mx-auto mb-5 text-4xl w-24 h-24 font-black border-3 border-[#F5B31C] bg-[#F5B31C] rounded-full'
								}
							>
								{key + 1}
							</div>
							<div
								className={'bg-white w-full h-full rounded-3xl pt-14 pb-5 px-5'}
							>
								<h3 className='text-2xl font-medium mb-3'>{elem.title}</h3>
								<p className='text-base'>{elem.text}</p>
							</div>
						</div>
					))}
				</div>
			</Container>
		</section>
	)
}
