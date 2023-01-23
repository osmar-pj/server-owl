import { Router } from 'express';
const router = Router()

import * as usersCtrl from '../controllers/user.controller'
import { authJwt, verifySignup } from '../middlewares'

router.get('/', [authJwt.verifyToken], usersCtrl.getUsers)

export default router