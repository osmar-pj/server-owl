import {Router} from 'express'
const router = Router()

import * as paramCtrl from '../controllers/device.controller'
import {authJwt, verifySignup} from '../middlewares'

router.get('/', [authJwt.verifyToken], paramCtrl.getDevices)
router.post('/', [authJwt.verifyToken], paramCtrl.createDevice)
router.post('/deviceConfiguring', [authJwt.verifyToken], paramCtrl.wifiCredentials)
router.get('/:deviceId', [authJwt.verifyToken], paramCtrl.getDeviceById)
router.put('/:deviceId', [authJwt.verifyToken], paramCtrl.updateDeviceById)
router.delete('/:deviceId', [authJwt.verifyToken], paramCtrl.deleteDeviceById)

export default router