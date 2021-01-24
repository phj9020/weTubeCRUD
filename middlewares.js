import multer from 'multer';
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from './routes';

// s3 initialize
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY
})

// const multerVideo = multer({ dest: 'uploads/videos/' });
// const multerAvatar = multer({ dest: 'uploads/avatars/' });
const multerVideo = multer({ storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: 'wetube1forproject/video'
    }) 
});
const multerAvatar = multer({ storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: 'wetube1forproject/avatar'
    }) 
});

export const uploadVideo = multerVideo.single('videoFile');
export const uploadAvatar = multerAvatar.single('avatar');

export const localsMiddleWare = (req, res, next) =>{
    res.locals.siteName = 'WeTube';
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;
    console.log(req.user)
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


