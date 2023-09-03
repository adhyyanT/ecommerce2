import express from 'express';
import { getProfile } from '../Controller/profileController';

const router = express.Router();

router.route('/getprofile').get(getProfile);

export default router;
