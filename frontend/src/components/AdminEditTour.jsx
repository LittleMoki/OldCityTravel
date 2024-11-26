import {
	Accordion,
	AccordionItem,
	Button,
	Card,
	Checkbox,
	Input,
} from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../api/api'
import CustomEditor from '../ui/CustomEditor'

const AdminEditTour = () => {
	const { id, locale } = useParams()
	const navigate = useNavigate()
	const [data, setData] = useState({
		cost: '',
		url: '',
		translations: [],
		tourDays: [],
	})

	// Загрузка данных
	const fetchData = async () => {
		try {
			const response = await fetch(`${BASE_URL}/tour/${id}`)
			const result = await response.json()
			setData(result)
		} catch (error) {
			console.error('Ошибка при загрузке данных:', error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [id])

	// Обработчик изменения перевода
	const handleTranslationChange = (index, field, value) => {
		const updatedTranslations = [...data.translations]
		updatedTranslations[index] = {
			...updatedTranslations[index],
			[field]: value,
		}
		setData(prevData => ({ ...prevData, translations: updatedTranslations }))
	}

	// Обработчик изменения перевода дня
	const handleDayTranslationChange = (dayIndex, langIndex, field, value) => {
		const updatedDays = [...data.tourDays]
		const updatedTranslations = [...updatedDays[dayIndex].translations]
		updatedTranslations[langIndex] = {
			...updatedTranslations[langIndex],
			[field]: value,
		}
		updatedDays[dayIndex].translations = updatedTranslations
		setData(prevData => ({ ...prevData, tourDays: updatedDays }))
	}

	// Удаление дня
	const handleRemoveDay = index => {
		const updatedDays = data.tourDays.filter((_, i) => i !== index)
		setData(prevData => ({ ...prevData, tourDays: updatedDays }))
	}

	// Изменение стоимости
	const handleChange = (field, value) => {
		setData(prevData => ({ ...prevData, [field]: value }))
	}

	// Изменение состояния чекбоксов
	const handleCheckboxChange = (dayIndex, field, value) => {
		const updatedDays = [...data.tourDays]
		updatedDays[dayIndex] = {
			...updatedDays[dayIndex],
			[field]: value,
		}
		setData(prevData => ({ ...prevData, tourDays: updatedDays }))
	}

	// Добавление дня
	const handleAddDay = () => {
		setData(prevData => ({
			...prevData,
			tourDays: [
				...prevData.tourDays,
				{
					breakfast: false,
					lunch: false,
					dinner: false,
					translations: [
						{ name: '', description: '', language: 'ru' },
						{ name: '', description: '', language: 'uz' },
						{ name: '', description: '', language: 'en' },
					],
				},
			],
		}))
	}
	const handleSubmit = async () => {
		const formData = new FormData()
		formData.append('cost', data.cost)
		formData.append('url', data.url)
		formData.append('image', data.image)
		formData.append('translations', JSON.stringify(data.translations))
		formData.append('tourDays', JSON.stringify(data.tourDays))
		try {
			const response = await fetch(`${BASE_URL}/tour/${id}`, {
				method: 'PUT',
				body: formData,
			})
			await response.json()
			setData({
				cost: '',
				url: '',
				image: null,
				translations: [
					{ language: 'ru', name: '', description: '' },
					{ language: 'uz', name: '', description: '' },
					{ language: 'en', name: '', description: '' },
				],
				tourDays: [
					{
						breakfast: false,
						lunch: false,
						dinner: false,
						translations: [
							{ name: '', description: '', language: 'ru' },
							{ name: '', description: '', language: 'uz' },
							{ name: '', description: '', language: 'en' },
						],
					},
				],
			})
			if (response.ok) {
				return navigate(`/${locale}/admin`)
			}
		} catch (error) {
			console.error('Ошибка создания тура:', error)
		}
	}
	const handleFileChange = e => {
		setData({ ...data, image: e.target.files[0] })
	}
	return (
		<div className='min-h-screen max-w-[1200px] mx-auto p-4'>
			{/* Цена тура */}
			<Card className='dark px-3 py-5 flex flex-col gap-4'>
				<Input
					label='Цена тура'
					value={data.cost}
					onChange={e => handleChange('cost', e.target.value)} // Используем handleCostChange
				/>
				<Input
					label='Ссылка на тур'
					value={data.url}
					onChange={e => handleChange('url', e.target.value)}
				/>
				<Input type='file' label='Изображение' onChange={handleFileChange} />

				{/* Переводы */}
				{data.translations?.map((translation, index) => (
					<div key={index} className='flex flex-col gap-2'>
						<Input
							label={`Название (${translation.language.toUpperCase()})`}
							value={translation.name}
							onChange={e =>
								handleTranslationChange(index, 'name', e.target.value)
							}
						/>
						Описание тура
						<CustomEditor
							id={`Описание (${translation.language.toUpperCase()})`}
							value={translation.description}
							fn={e => handleTranslationChange(index, 'description', e)}
						/>
					</div>
				))}

				{/* Дни тура */}
				<Accordion className='border-white border-[1px]' variant='splitted'>
					{data?.tourDays?.map((day, index) => (
						<AccordionItem
							key={index}
							title={`День ${index + 1}`}
							className='relative'
						>
							<Button
								color='error'
								size='sm'
								className='absolute top-2 right-2'
								onClick={() => handleRemoveDay(index)} // Удаление дня
							>
								Удалить
							</Button>
							<div className='flex flex-col gap-3'>
								{/* Чекбоксы для еды */}
								<Checkbox
									isSelected={day.breakfast}
									onChange={isSelected =>
										handleCheckboxChange(
											index,
											'breakfast',
											Boolean(isSelected)
										)
									}
								>
									Завтрак
								</Checkbox>
								<Checkbox
									isSelected={day.lunch}
									onChange={isSelected =>
										handleCheckboxChange(index, 'lunch', Boolean(isSelected))
									}
								>
									Обед
								</Checkbox>
								<Checkbox
									isSelected={day.dinner}
									onChange={isSelected =>
										handleCheckboxChange(index, 'dinner', Boolean(isSelected))
									}
								>
									Ужин
								</Checkbox>

								{/* Переводы для дня */}
								{day.translations.map((translation, langIndex) => (
									<div key={langIndex} className='flex flex-col gap-2'>
										<Input
											label={`Название (${translation.language.toUpperCase()})`}
											value={translation.name}
											onChange={e =>
												handleDayTranslationChange(
													index,
													langIndex,
													'name',
													e.target.value
												)
											}
										/>
										<CustomEditor
											id={`Описание (${translation.language.toUpperCase()})`}
											value={translation.description}
											fn={e =>
												handleDayTranslationChange(
													index,
													langIndex,
													'description',
													e
												)
											}
										/>
									</div>
								))}
							</div>
						</AccordionItem>
					))}
				</Accordion>

				{/* Кнопка для добавления дня */}
				<Button onClick={handleAddDay}>Добавить день</Button>
				<Button onClick={handleSubmit}>Обновить тур</Button>
			</Card>
		</div>
	)
}

export default AdminEditTour
