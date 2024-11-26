import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

import { Accordion, AccordionItem } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import {
	FaCalendarAlt,
	FaDollarSign,
	FaMapMarkedAlt,
	FaUtensils,
} from 'react-icons/fa'
import { BASE_PHOTO_URL, BASE_URL } from '../api/api'
import { Container } from '../ui/Container'
import { Reserve } from '../ui/Reserve'

export const ProductPage = () => {
	const { id, locale } = useParams()
	const { t } = useTranslation()
	const [data, setData] = useState([])
	const fetchData = async () => {
		const response = await fetch(`${BASE_URL}/tours/${id}?lang=${locale}`)
		const data = await response.json()
		setData(data)
	}
	useEffect(() => {
		fetchData()
	}, [locale])

	const title = data?.translations?.filter(el => el.language === locale)[0]
		?.name
	const days = data?.tourDays?.length
	return (
		<>
			<Header />
			<main className='py-[150px] min-h-screen flex lg:items-center'>
				<Container>
					<div className='grid lg:grid-cols-2 gap-3'>
						<div className='overflow-hidden rounded-lg '>
							<img
								className='w-full h-full object-cover'
								src={`${BASE_PHOTO_URL}/${data?.image}`}
								alt={`${BASE_PHOTO_URL}/${data?.image}`}
							/>
						</div>
						<div className='flex bg-white gap-5 py-5 rounded-lg flex-col items-center justify-between'>
							<h3 className='text-center lg:text-3xl text-xl font-semibold'>
								<span className='font-normal'>{title}</span>
							</h3>
							<div className='grid grid-cols-3 w-full'>
								<p className='lg:text-xl flex items-center flex-col font-semibold'>
									<FaMapMarkedAlt className='text-[#F5B31C]' />
									{t('productPage.cities')}:{' '}
									<span className='font-normal'>
										{t('travel.cities', {
											postProcess: 'interval',
											count: days > !0 ? days : 1,
										})}
									</span>
								</p>
								<p className='lg:text-xl flex items-center flex-col font-semibold'>
									<FaCalendarAlt className='text-[#F5B31C]' />
									{t('productPage.days')}:{' '}
									<span className='font-normal'>
										{t('travel.days', {
											postProcess: 'interval',
											count: days > !0 ? days : 1,
										})}
									</span>
								</p>
								<p className='lg:text-xl flex items-center flex-col font-semibold'>
									<FaDollarSign className='text-[#F5B31C]' />
									{t('productPage.price')}:{' '}
									<span className='font-normal'>{data?.cost}$</span>
								</p>
							</div>
							<Reserve title={title} />
						</div>
					</div>
					<div className='py-5'>
						{data?.tourDays?.length > 0 ? (
							<Accordion variant='splitted'>
								{data?.tourDays?.map((el, i) => (
									<AccordionItem
										key={i}
										startContent={`День ${i + 1}`}
										title={`${el.translations[0].name}`}
									>
										<div
											dangerouslySetInnerHTML={{
												__html: el.translations[0].description,
											}}
										/>
										<div className='flex gap-3 pt-3'>
											<div>
												{el.breakfast ? (
													<small className='flex items-center gap-1'>
														<FaUtensils />
														Завтрак
													</small>
												) : (
													''
												)}
											</div>
											<div>
												{el.lunch ? (
													<small className='flex items-center gap-1'>
														<FaUtensils />
														Обед
													</small>
												) : (
													''
												)}
											</div>
											<div>
												{el.dinner ? (
													<small className='flex items-center gap-1'>
														<FaUtensils />
														Ужин
													</small>
												) : (
													''
												)}
											</div>
										</div>
									</AccordionItem>
								))}
							</Accordion>
						) : (
							''
						)}
					</div>
				</Container>
			</main>
			<Footer />
		</>
	)
}
