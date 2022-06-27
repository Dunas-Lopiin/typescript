import { CreateOwner } from '../controller';
import { Router } from 'express';

const route = Router();

route.route('/create')
    .post(new CreateOwner().handle.bind(new CreateOwner()));



export default route;