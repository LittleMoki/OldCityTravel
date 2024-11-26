import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

export default function SwipeableTemporaryDrawer() {
	const [open, setOpen] = useState(false)
	const { id } = useParams()
	const { i18n } = useTranslation()
	const navigate = useNavigate()
	const changeLanguage = language => {
		i18n.changeLanguage(language)
		// Update the URL to reflect the new language
		if (id) {
			navigate(`/${language}/tour/${id}`, { replace: true })
		} else {
			navigate(`/${language}`, { replace: true })
		}
	}
	const toggleDrawer = newOpen => () => {
		setOpen(newOpen)
	}

	const list = () => (
		<Box
			role='presentation'
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			<List>
				{[
					{ text: 'Домашняя страница', link: '/' },
					{ text: 'О нас', link: '#about' },
					{ text: 'Наши сервисы', link: '#services' },
					{ text: 'Путешествия', link: '#trip' },
					{ text: 'Коммуникация', link: '#contact' },
				].map(item => (
					<ListItem key={item.text} disablePadding>
						<ListItemButton component='a' href={item.link}>
							<ListItemText primary={item.text} />
						</ListItemButton>
					</ListItem>
				))}
				<div className='flex gap-3 justify-start p-3'>
					<img
						onClick={() => changeLanguage('en')}
						src='https://wonderfull-travel.uz/wp-content/plugins/gtranslate/flags/32/en-us.png'
						alt='usa'
					/>
					<img
						onClick={() => changeLanguage('ru')}
						src='https://wonderfull-travel.uz/wp-content/plugins/gtranslate/flags/32/ru.png'
						alt='russian'
					/>
					<img
						onClick={() => changeLanguage('uz')}
						src='https://wonderfull-travel.uz/wp-content/plugins/gtranslate/flags/32/uz.png'
						alt='uzbekistan'
					/>
				</div>
			</List>
		</Box>
	)

	return (
		<div className='block lg:hidden'>
			<MenuIcon
				sx={{ color: 'white' }}
				fontSize='large'
				onClick={toggleDrawer(true)}
			/>
			<SwipeableDrawer
				sx={{ transform: 'translateY(87px)' }}
				anchor='top'
				open={open}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
			>
				{list()}
			</SwipeableDrawer>
		</div>
	)
}
