const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const multer = require('multer')
const {
	ProductCategoryController,
	ProductController,
	FactoryController,
	TechniqueController,
	HomeVideo,
	AboutVideo,
	TourController,
} = require('../controller')
const { prisma } = require('../prisma/prisma-client')

// uploads storage

const uploadsDestination = 'uploads'

const storage = multer.diskStorage({
	destination: uploadsDestination,
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	},
})

const SECRET_KEY = process.env.JWT_SECRET_KEY // Это секретный ключ для подписания токенов

// Эндпоинт для входа
router.post('/login', (req, res) => {
	const { username, password } = req.body

	// Проверка логина и пароля (в реальной жизни используйте хэширование пароля)
	if (
		username === process.env.ADMIN_LOGIN &&
		password === process.env.ADMIN_PASSWORD
	) {
		const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' })
		return res.json({ token })
	}

	return res.status(401).json({ message: 'Invalid credentials' })
})

const upload = multer({ storage: storage })

router.get('/tour', TourController.getTours)
router.get('/tour/:id', TourController.getTour)
router.get('/tourSlag/:url', TourController.getTourSlag)
router.get('/tours/:id', TourController.getTourTranslate)
router.post('/tour', upload.single('image'), TourController.createTour)
router.delete('/tour/:id', TourController.deleteTour)
router.put('/tour/:id', upload.single('image'), TourController.updateTour)

module.exports = router
