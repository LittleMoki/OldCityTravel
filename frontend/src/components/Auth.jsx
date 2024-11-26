import { Button, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../api/api'
import logo from '../assets/oldcitytravel_logo.svg'

const LoginPage = () => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const handleLogin = async () => {
		const response = await fetch(`${BASE_URL}/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: login, password }),
		})
		const data = await response.json()

		if (data.token) {
			sessionStorage.setItem('auth_token', data.token) // Сохраняем токен
			navigate('/ru/admin') // Перенаправляем на админку
		} else {
			alert('Неверный логин или пароль')
		}
	}

	return (
		<div className='min-h-screen flex justify-center items-center'>
			<div className='max-w-[500px] flex flex-col gap-3'>
				<img src={logo} />
				<Input
					type='text'
					placeholder='Логин'
					value={login}
					onChange={e => setLogin(e.target.value)}
				/>
				<Input
					type='password'
					placeholder='Пароль'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<Button onClick={handleLogin}>Войти</Button>
			</div>
		</div>
	)
}

export default LoginPage
