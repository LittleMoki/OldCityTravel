import { createBrowserRouter, Navigate } from 'react-router-dom'
import AdminEditTour from './src/components/AdminEditTour'
import AdminPage from './src/module/AdminPage'
import { HomePage } from './src/module/HomePage'
import { ProductPage } from './src/module/ProductPage'
import { ProtectedRoute } from './src/components/ProtectedRoute'
import LoginPage from './src/components/Auth'

export const router = createBrowserRouter([
	{
		path: '/:locale',
		element: <HomePage />,
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '/:locale/tour/:id',
		element: <ProductPage />,
	},
	{
		path: '/:locale/admin',
		element: (
			<ProtectedRoute>
				<AdminPage />
			</ProtectedRoute>
		),
	},
	{
		path: '/:locale/admin/edit/:id',
		element: (
			<ProtectedRoute>
				<AdminEditTour />
			</ProtectedRoute>
		),
	},
	{
		path: '*',
		element: <Navigate to='/ru' replace />,
	},
])
