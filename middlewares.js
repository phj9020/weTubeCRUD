import multer from 'multer';
import routes from './routes';

const multerVideo = multer({ dest: 'uploads/videos/' });

export const localsMiddleWare = (req, res, next) =>{
    res.locals.siteName = 'WeTube';
    res.locals.routes = routes;
    res.locals.user = req.user || null;
    next();
}
export const onlyPublic = (req, res, next) => {
    // req.user가 존재하면 home으로 보내고
    if(req.user) {
        res.redirect(routes.home);
    } else {
        // req.user가 존재하지 않으면 join과 login을 보여준다
        next();
    }
}

export const onlyPrivate =(req, res, next) =>{
    if(req.user) {
        next();
    } else {
        res.redirect(routes.home)
    }
}


export const uploadVideo = multerVideo.single('videoFile');