import { SearchExtract } from '../controller';
import { Router } from 'express';

const route = Router();

route.route('/extract')
    .post(new SearchExtract().handle.bind(new SearchExtract()));



export default route;