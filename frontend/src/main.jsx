import { NextUIProvider } from '@nextui-org/react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '../router.jsx'
import './i18n/i18n.js'
import './index.css'

createRoot(document.getElementById('root')).render(
	<NextUIProvider>
		<RouterProvider router={router} />
	</NextUIProvider>
)
