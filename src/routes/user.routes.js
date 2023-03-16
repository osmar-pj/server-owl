import { Router } from 'express';
const router = Router()

import * as usersCtrl from '../controllers/user.controller'
import { authJwt, verifySignup } from '../middlewares'

router.get('/', [authJwt.verifyToken], usersCtrl.getUsers)

router.post('/', [authJwt.verifyToken, authJwt.isUser, authJwt.isModerator, authJwt.isAdmin], usersCtrl.createUser)

router.get('/:userId', [authJwt.verifyToken], usersCtrl.getUserById)

router.put('/:userId', [authJwt.verifyToken, authJwt.isUser, authJwt.isModerator, authJwt.isAdmin], usersCtrl.updateUserById)

router.delete('/:userId', [authJwt.verifyToken, authJwt.isModerator, authJwt.isAdmin], usersCtrl.deleteUserById)

export default router