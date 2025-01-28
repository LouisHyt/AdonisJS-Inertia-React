/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import transmit from '@adonisjs/transmit/services/main'
import router from '@adonisjs/core/services/router'
import './transmit.ts'
import AuthController from '#controllers/auth_controller'
import { middleware } from './kernel.js'

transmit.registerRoutes()

router.get('/', ({ inertia }) => inertia.render('home')).as('home')
router
  .get('/feed', ({ inertia }) => inertia.render('feed'))
  .as('feed')
  .use(middleware.auth())

router.get('/login', [AuthController, 'showLogin']).as('auth.login')
router.post('/login', [AuthController, 'handleLogin']).as('auth.handle_login')
router.get('/register', [AuthController, 'showRegister']).as('auth.register')
router.post('/register', [AuthController, 'handleRegister']).as('auth.handle_register')
router.post('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())

//Transmit Routes
router.post('/chat', ({ request, response }) => {
  const currentDate = new Date()

  transmit.broadcast('chat/1', {
    userUid: request.input('userUid'),
    message: request.input('message'),
    user: request.input('user'),
    sentAt: `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`,
  })
  return response.noContent()
})
