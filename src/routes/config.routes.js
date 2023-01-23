import { Router } from 'express'
const router = Router()

import * as paramCtrl from '../controllers/device.controller'
import { authJwt, verifySignup } from '../middlewares'

router.get('/', [authJwt.verifyToken], paramCtrl.getDevices)

export default router