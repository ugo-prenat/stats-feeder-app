import express from 'express'
import controller from '../controllers/Twitter.controller'

const router = express.Router()

router.post('/available/username', controller.checkUsername)

export = router
