import multer from 'multer';
import routes from './routes';

const multerVideo = multer({ dest: 'uploads/videos/' });

export const localsMiddleWare = (req, res, next) =>{
    res.locals.siteName = 'WeTube';
    res.locals.routes = routes;
    res.locals.user = req.user || {};
    next();
}

export const uploadVideo = multerVideo.single('videoFile');