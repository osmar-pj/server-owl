import {Router} from 'express'
const router = Router()

import * as helpCtrl from '../controllers/help.controller'
import {authJwt, verifySignup} from '../middlewares'

router.get('/device/:mac', [authJwt.verifyToken], helpCtrl.getDeviceParam)
router.post('/device/:mac', [authJwt.verifyToken], helpCtrl.setDeviceParam)
router.post('/device/initial/:mac', [authJwt.verifyToken], helpCtrl.setDeviceInitial)

export default router