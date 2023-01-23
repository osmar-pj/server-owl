import { Router } from 'express';
const router = Router()

import * as paramCtrl from '../controllers/parameter.controller'
import { authJwt, verifySignup } from '../middlewares'

router.get('/', [authJwt.verifyToken], paramCtrl.getParameters)
router.post('/', [authJwt.verifyToken], paramCtrl.createParameter)
router.get('/:parameterId', [authJwt.verifyToken], paramCtrl.getParameterById)
router.put('/:parameterId', [authJwt.verifyToken], paramCtrl.updateParameterById)
router.delete('/:parameterId', [authJwt.verifyToken], paramCtrl.deleteParameterById)
router.get('/category/:category', [authJwt.verifyToken], paramCtrl.getParameterByCategory)

export default router