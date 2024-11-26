import {
	Accordion,
	AccordionItem,
	Button,
	Card,
	Checkbox,
	Input,
} from '@nextui-org/react'
import React, { useState } from 'react'
import { BASE_URL } from '../api/api'
import CustomEditor from '../ui/CustomEditor'

const AdminCreateTour = ({ refresh }) => {
	const [tourData, setTourData] = useState({
		cost: '',
		image: null,
		url: '',
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

	const handleChange = (field, value) => {
		setTourData({ ...tourData, [field]: value })
	}

	const handleTranslationChange = (index, field, value) => {
		const updatedTranslations = [...tourData.translations]
		updatedTranslations[index] = {
			...updatedTranslations[index],
			[field]: value,
		}
		setTourData({ ...tourData, translations: updatedTranslations })
	}

	const handleFileChange = e => {
		setTourData({ ...tourData, image: e.target.files[0] })
	}

	const handleAddDay = () => {
		setTourData({
			...tourData,
			tourDays: [
				...tourData.tourDays,
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
	}

	const handleRemoveDay = index => {
		const updatedDays = tourData.tourDays.filter((_, i) => i !== index)
		setTourData({ ...tourData, tourDays: updatedDays })
	}

	const handleDayTranslationChange = (dayIndex, langIndex, field, value) => {
		const updatedDays = [...tourData.tourDays]
		const updatedTranslations = [...updatedDays[dayIndex].translations]
		updatedTranslations[langIndex] = {
			...updatedTranslations[langIndex],
			[field]: value,
		}
		updatedDays[dayIndex].translations = updatedTranslations
		setTourData({ ...tourData, tourDays: updatedDays })
	}

	const handleSubmit = async () => {
		const formData = new FormData()
		formData.append('cost', tourData.cost)
		formData.append('url', tourData.url)
		formData.append('image', tourData.image)
		formData.append('translations', JSON.stringify(tourData.translations))
		formData.append('tourDays', JSON.stringify(tourData.tourDays))

		try {
			const response = await fetch(`${BASE_URL}/tour`, {
				method: 'POST',
				body: formData,
			})
			await response.json()
			refresh()
			setTourData({
				cost: '',
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
		} catch (error) {
			console.error('Ошибка создания тура:', error)
		}
	}
	const handleCheckboxChange = (dayIndex, field, value) => {
		const updatedDays = [...tourData.tourDays]
		updatedDays[dayIndex] = {
			...updatedDays[dayIndex],
			[field]: value,
		}
		setTourData({ ...tourData, tourDays: updatedDays })
	}
	return (
		<Card className='dark px-3 mb-4 py-5 flex flex-col gap-5 black'>
			<Input
				label='Цена тура'
				value={tourData.cost}
				onChange={e => handleChange('cost', e.target.value)}
			/>
			<Input
				label='Ссылка на тур'
				value={tourData.url}
				onChange={e => handleChange('url', e.target.value)}
			/>
			<Input type='file' label='Изображение' onChange={handleFileChange} />

			<div className='flex flex-col gap-3'>
				{tourData.translations.map((translation, index) => (
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
			</div>

			<Accordion className='border-white border-[1px]' variant='splitted'>
				{tourData.tourDays.map((day, index) => (
					<AccordionItem
						key={index}
						title={`День ${index + 1}`}
						className='relative'
					>
						<Button
							color='error'
							size='sm'
							className='absolute top-2 right-2'
							onClick={() => handleRemoveDay(index)}
						>
							Удалить
						</Button>
						<div className='flex flex-col gap-3'>
							<Checkbox
								isSelected={day.breakfast}
								onChange={isSelected =>
									handleCheckboxChange(index, 'breakfast', Boolean(isSelected))
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

			<Button onClick={handleAddDay}>Добавить день</Button>
			<Button onClick={handleSubmit}>Создать тур</Button>
		</Card>
	)
}

export default AdminCreateTour
