import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../api/api'
import { Card } from '../ui/Card.jsx'
import { Container } from '../ui/Container.jsx'
import CustomTitle from '../ui/CustomTitle.jsx'

export const TravelDirections = () => {
	const { locale } = useParams() // Берем локаль из параметров URL
	const [data, setData] = useState([])

	// Функция для получения данных
	const fetchData = async () => {
		try {
			const response = await fetch(`${BASE_URL}/tour?lang=${locale}`) // Убедитесь, что lang используется правильно
			if (!response.ok) {
				throw new Error('Ошибка при получении данных с сервера')
			}
			const result = await response.json()
			setData(result)
		} catch (error) {
			console.error('Ошибка при загрузке туров:', error)
		}
	}

	// Обновляем данные при изменении locale
	useEffect(() => {
		fetchData()
	}, [locale]) // Добавьте locale в зависимости useEffect
	return (
		<section id='trip'>
			<Container>
				<CustomTitle
					tag='h2'
					text='travel.title'
					className={'text-center mb-14'}
				/>
				<div className='grid lg:grid-cols-3 lg:gap-10 grid-cols-2 gap-5'>
					{data?.map((el, i) => (
						<Card
							key={el.id}
							title={el.translations[0]?.name}
							price={el.cost}
							link={el.url}
							image={el.image}
							days={el.tourDays.length}
						/>
					))}
				</div>
			</Container>
		</section>
	)
}
