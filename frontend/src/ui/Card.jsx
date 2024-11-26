import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Button } from '@nextui-org/react'
import { useTranslation } from 'react-i18next'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, useParams } from 'react-router-dom'
import { BASE_PHOTO_URL } from '../api/api'

export const Card = ({ title = '', id, image, price, days, columns, rows }) => {
	const { t } = useTranslation()
	const { locale } = useParams()

	let customStyle

	// Определяем ширину экрана
	const screenWidth = window.screen.width

	// Применяем стили в зависимости от ширины экрана
	if (screenWidth > 430) {
		customStyle = { gridColumn: columns, gridRow: rows }
	}

	// При экране <= 768px задаем фиксированный col-span-4
	if (screenWidth <= 768) {
		customStyle = { gridColumn: 'span 4' }
	}

	return (
		<Link to={`/${locale}/tour/${id}`}>
			<div
				className={
					'cursor-pointer w-full h-full max-h-[300px] overflow-hidden relative rounded-3xl shadow-[10px_10px_5px_1px_rgba(0,0,0,0.2)]'
				}
				style={customStyle}
			>
				<div
					className='absolute top-0 left-0 w-full h-full z-[1]'
					style={{
						backgroundImage:
							'linear-gradient(180deg, transparent 30%, rgba(0, 0, 0, 60%) 100%)',
					}}
				/>
				<LazyLoadImage
					className='w-full h-full object-cover'
					src={`${BASE_PHOTO_URL}/${image}`}
					alt={title}
					effect='blur'
					wrapperClassName={'w-full h-full'}
				/>
				<div className='absolute bottom-0 left-0 z-10 p-5'>
					<h3 className='mb-5 text-white sm:text-lg lg:text-xl text-base font-medium'>
						{title}
					</h3>
					<div className='text-white text-lg mb-3 flex gap-5'>
						<div className={'flex items-center gap-2'}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='size-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
								/>
							</svg>
							$ {price}
						</div>
						<div className={'flex items-center gap-2'}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='size-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z'
								/>
							</svg>
							{t('travel.days', {
								postProcess: 'interval',
								count: days > !0 ? days : 1,
							})}
						</div>
						<div className={'flex items-center gap-2'}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='size-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
								/>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
								/>
							</svg>
							{t('travel.cities', {
								postProcess: 'interval',
								count: days > !0 ? days : 1,
							})}
						</div>
					</div>
					{/* <Reserve id={id} /> */}
					<Button
						endContent={<KeyboardArrowRightIcon />}
						className='bg-[#F5B31C] border-[#F5B31C] text-black font-medium sm:py-4 p-3 sm:px-7 px-5 rounded-[40px] border transition-all hover:-translate-y-1 mt-1 ml-3'
					>
						{t('second_button')}
					</Button>
				</div>
			</div>
		</Link>
	)
}
