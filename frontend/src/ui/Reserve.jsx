import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Textarea,
	useDisclosure,
} from '@nextui-org/react'
import axios from 'axios'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Reserve = ({ title }) => {
	const tourHashMap = {
		1: 'Экскурсия по Ташкенту',
		2: 'Экскурсия по Самарканду',
		3: 'Экскурсия по Бухаре',
		4: 'Экскурсия по Хиве',
	}
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const { t } = useTranslation()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [wishes, setWishes] = useState('')

	const sendData = async () => {
		if (!name || !email || !phone) {
			alert('Пожалуйста, заполните все обязательные поля.')
			return
		}
		try {
			await axios.post(
				`https://api.telegram.org/bot7252709561:AAHuM4MlUEJEyUA7ZeiyAZSOc731IFBv6xk/sendMessage`,
				{
					chat_id: 5971164873, // замените на ID чата или пользователя
					text: `Название тура: ${title}\nНовый заказ от ${name}\nEmail: <a href='mailto:${email}'>${email}</a>\nТелефон: <a href='tel:${phone}'>${phone}</a>\nПожелания: ${wishes}`,
					parse_mode: 'HTML',
				}
			)
			setEmail('')
			setName('')
			setPhone('')
			setWishes('')
			alert('Заказ отправлен в Telegram!')
		} catch (error) {
			alert('Ошибка при отправке заказа в Telegram.')
			console.error(error)
		}
	}

	return (
		<>
			<Button
				className='bg-[#F5B31C] border-[#F5B31C] text-black font-medium sm:py-4 p-3 sm:px-7 px-5 text-lg rounded-[40px] border transition-all hover:-translate-y-1'
				endContent={<KeyboardArrowRightIcon />}
				onPress={onOpen}
			>
				{t('form.button')}
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className='flex flex-col gap-1 text-black text-center text-2xl my-3'>
								{t('form.title')}
							</ModalHeader>
							<ModalBody>
								<Input
									label={t('form.name')}
									value={name}
									onChange={e => setName(e.target.value)}
								/>
								<Input
									label={t('form.email')}
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
								<Input
									label={t('form.phone')}
									value={phone}
									onChange={e => setPhone(e.target.value)}
								/>
								<Textarea
									label={t('form.wishes')}
									value={wishes}
									onChange={e => setWishes(e.target.value)}
								/>
							</ModalBody>
							<ModalFooter>
								<Button
									className='bg-green-500 text-white w-full'
									variant='light'
									onPress={onClose}
									onClick={sendData}
								>
									{t('form.button')}
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
