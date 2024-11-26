import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { BASE_PHOTO_URL, BASE_URL } from '../api/api'
import AdminCreateTour from '../components/AdminCreateTour'

const AdminPage = () => {
	const { locale } = useParams()
	const [data, setData] = useState([])
	const fetchData = async () => {
		try {
			const response = await fetch(`${BASE_URL}/tour?lang=${locale}`)
			const data = await response.json()
			setData(data)
		} catch (error) {
			console.error(error, 'error of fetching products')
		}
	}
	useEffect(() => {
		fetchData()
	}, [])

	const deleteTour = async id => {
		try {
			const response = await fetch(`${BASE_URL}/tour/${id}`, {
				method: 'DELETE',
			})
			if (!response.ok) throw new Error('Ошибка при удалении тура')
			fetchData()
		} catch (error) {
			console.error('Ошибка при удалении тура:', error)
		}
	}
	return (
		<div className='min-h-screen max-w-[1200px] mx-auto py-5 px-2'>
			<AdminCreateTour refresh={fetchData} />
			<div className='grid lg:grid-cols-3 lg:gap-10 grid-cols-2 gap-5'>
				{data.map(el => (
					<Card key={el.id} className='py-4'>
						<CardHeader className='flex justify-between items-center'>
							<Link
								to={`/${locale}/admin/edit/${el?.id}`}
								className='pb-0 pt-2 px-4 flex-col items-start'
							>
								<h4 className='font-bold text-xl'>
									{el.translations[0]?.name}
								</h4>
								<p className='uppercase text-base font-bold'>{el?.cost}$</p>
							</Link>
							<FaTrash
								onClick={() => deleteTour(el?.id)}
								className='hover:text-red-500 cursor-pointer'
							/>
						</CardHeader>
						<CardBody className='py-2 max-h-[200px] overflow-clip'>
							<Link to={`/${locale}/admin/edit/${el?.id}`}>
								<Image
									alt='Card background'
									className='object-cover rounded-xl w-full h-full'
									src={`${BASE_PHOTO_URL}/${el?.image}`}
								/>
							</Link>
						</CardBody>
					</Card>
				))}
			</div>
		</div>
	)
}

export default AdminPage
