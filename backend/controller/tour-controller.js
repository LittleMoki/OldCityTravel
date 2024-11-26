const { prisma } = require('../prisma/prisma-client')

const TourController = {
	createTour: async (req, res) => {
		const { cost, translations, tourDays } = req.body

		if (!req.file || !cost || !translations || !tourDays) {
			return res
				.status(400)
				.json({ error: 'Недостаточно данных для создания тура' })
		}

		try {
			const parsedTranslations = JSON.parse(translations)
			const parsedTourDays = JSON.parse(tourDays)

			const tour = await prisma.tour.create({
				data: {
					cost,
					image: req.file.originalname,
					translations: {
						create: parsedTranslations.map(t => ({
							language: t.language,
							name: t.name,
						})),
					},
					tourDays: {
						create: parsedTourDays.map(day => ({
							breakfast: day.breakfast,
							lunch: day.lunch,
							dinner: day.dinner,
							translations: {
								create: day.translations.map(translation => ({
									name: translation.name || '',
									description: translation.description || '',
									language: translation.language || '',
								})),
							},
						})),
					},
				},
			})
			res.status(201).json(tour)
		} catch (error) {
			console.error('Ошибка при создании тура:', error)
			res
				.status(500)
				.json({ error: error.message || 'Ошибка при создании тура' })
		}
	},
	getTours: async (req, res) => {
		const { lang = 'en' } = req.query
		try {
			const tours = await prisma.tour.findMany({
				include: {
					translations: { where: { language: lang } },
					tourDays: {
						include: {
							translations: { where: { language: lang } },
						},
					},
				},
			})
			res.status(200).json(tours)
		} catch (error) {
			console.error('Ошибка при получении туров:', error)
			res
				.status(500)
				.json({ error: error.message || 'Ошибка при получении туров' })
		}
	},
	getTour: async (req, res) => {
		const { id } = req.params

		try {
			const tour = await prisma.tour.findUnique({
				where: { id: Number(id) },
				include: {
					translations: true,
					tourDays: {
						include: {
							translations: true,
						},
					},
				},
			})
			if (!tour) {
				return res.status(404).json({ error: 'Тур не найден' })
			}
			res.status(200).json(tour)
		} catch (error) {
			console.error('Ошибка при получении тура:', error)
			res
				.status(500)
				.json({ error: error.message || 'Ошибка при получении тура' })
		}
	},
	getTourTranslate: async (req, res) => {
		const { id } = req.params
		const { lang = 'en' } = req.query

		try {
			const tour = await prisma.tour.findUnique({
				where: { id: Number(id) },
				include: {
					translations: { where: { language: lang } },
					tourDays: {
						include: {
							translations: { where: { language: lang } },
						},
					},
				},
			})
			if (!tour) {
				return res.status(404).json({ error: 'Тур не найден' })
			}
			res.status(200).json(tour)
		} catch (error) {
			console.error('Ошибка при получении тура:', error)
			res
				.status(500)
				.json({ error: error.message || 'Ошибка при получении тура' })
		}
	},
	updateTour: async (req, res) => {
		const { id } = req.params
		const { cost, translations, tourDays } = req.body
		// Check for missing or invalid data
		if (!cost || !translations || !tourDays) {
			return res
				.status(400)
				.json({ error: 'Недостаточно данных для обновления тура' })
		}

		try {
			const parsedTranslations = translations ? JSON.parse(translations) : []
			const parsedTourDays = tourDays ? JSON.parse(tourDays) : []
			console.log(req?.file)
			const updatedTour = await prisma.tour.update({
				where: { id: Number(id) },
				data: {
					cost,
					image: req?.file?.originalname,
					translations: {
						deleteMany: {},
						create: parsedTranslations.map(t => ({
							language: t.language,
							name: t.name,
						})),
					},
					tourDays: {
						deleteMany: {},
						create: parsedTourDays.map(day => ({
							breakfast: day.breakfast,
							lunch: day.lunch,
							dinner: day.dinner,
							translations: {
								create: day.translations.map(translation => ({
									name: translation.name || '',
									description: translation.description || '',
									language: translation.language || '',
								})),
							},
						})),
					},
				},
			})
			res.status(200).json(updatedTour)
		} catch (error) {
			console.error('Ошибка при обновлении тура:', error)
			res
				.status(500)
				.json({ error: error.message || 'Ошибка при обновлении тура' })
		}
	},
	deleteTour: async (req, res) => {
		const { id } = req.params
		try {
			await prisma.tour.delete({
				where: { id: Number(id) },
			})
			res.status(200).json({ message: 'Тур успешно удален' })
		} catch (error) {
			console.error('Ошибка при удалении тура:', error)
			res
				.status(500)
				.json({ error: error.message || 'Ошибка при удалении тура' })
		}
	},
}

module.exports = TourController
