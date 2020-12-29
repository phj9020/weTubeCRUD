import routes from './routes';

export const localsMiddleWare = (req, res, next) =>{
    res.locals.siteName = 'WeTube';
    res.locals.routes = routes;
    next();
}