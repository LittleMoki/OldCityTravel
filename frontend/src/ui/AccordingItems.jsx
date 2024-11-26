import { Button, Checkbox, Input } from '@nextui-org/react'
import React from 'react'
import CustomEditor from './CustomEditor'

const AccordingItems = ({ day, onChange, onDelete }) => {
	// Обработчик для обновления конкретного поля
	const handleFieldChange = (field, value) => {
		if (onChange) {
			onChange(field, value)
		}
	}

	return (
		<div className="flex flex-col gap-4 items-start">
			{/* Поле для ввода названия дня */}
			<Input
				label="Название"
				value={day.name || ''}
				onChange={(e) => handleFieldChange('name', e.target.value)}
			/>

			{/* Редактор для описания дня */}
			<CustomEditor
				value={day.description || ''}
				onChange={(value) => handleFieldChange('description', value)}
			/>

			{/* Чекбоксы для выбора приемов пищи */}
			<div className="flex gap-3">
				<Checkbox
					isSelected={day.breakfast || false}
					onChange={(e) => handleFieldChange('breakfast', e.target.checked)}
				>
					Завтрак
				</Checkbox>
				<Checkbox
					isSelected={day.lunch || false}
					onChange={(e) => handleFieldChange('lunch', e.target.checked)}
				>
					Обед
				</Checkbox>
				<Checkbox
					isSelected={day.dinner || false}
					onChange={(e) => handleFieldChange('dinner', e.target.checked)}
				>
					Ужин
				</Checkbox>
			</div>

			{/* Кнопка для удаления дня */}
			<Button color="error" onClick={onDelete}>
				Удалить
			</Button>
		</div>
	)
}

export default AccordingItems
