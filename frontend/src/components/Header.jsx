import { useEffect, useState } from 'react'
import logo from '../assets/oldcitytravel_logo.svg'
import { Container } from '../ui/Container'
import SwipeableTemporaryDrawer from '../ui/mobileMenu'

import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'

export const Header = () => {
	const { i18n, t } = useTranslation()
	const { id } = useParams()
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
	// console.log(document.body.style.overflow = 'hidden')
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10)
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])
	return (
		<header
			className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
				isScrolled || id ? 'bg-[#141e30]' : 'bg-transparent'
			}`}
		>
			<Container>
				<div className='flex items-center py-2 justify-between'>
					<Link to={'/' + i18n.language}>
						<img className='w-[70px] h-[70px]' src={logo} alt={t('alt')} />
					</Link>
					<ul className={`gap-6 text-base lg:flex hidden text-white`}>
						<li>
							<a href='#about'>{t('header.about')}</a>
						</li>
						<li>
							<a href='#trip'>{t('header.tours')}</a>
						</li>
						<li>
							<a href='#contact'>{t('header.contact')}</a>
						</li>
					</ul>
					<div className='lg:flex gap-2 hidden'>
						<img
							onClick={() => changeLanguage('en')}
							className='cursor-pointer'
							src='https://wonderfull-travel.uz/wp-content/plugins/gtranslate/flags/32/en-us.png'
							alt='usa'
						/>
						<img
							onClick={() => changeLanguage('ru')}
							className='cursor-pointer'
							src='https://wonderfull-travel.uz/wp-content/plugins/gtranslate/flags/32/ru.png'
							alt='russian'
						/>
						<img
							onClick={() => changeLanguage('uz')}
							className='cursor-pointer'
							src='https://wonderfull-travel.uz/wp-content/plugins/gtranslate/flags/32/uz.png'
							alt='uzbekistan'
						/>
					</div>
					<SwipeableTemporaryDrawer />
				</div>
			</Container>
		</header>
	)
}
