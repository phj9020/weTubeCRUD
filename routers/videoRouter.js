import express from 'express';
import routes from '../routes';
import { getUpload, postUpload, videoDetail, getEditVideo, postEditVideo, deleteVideo } from "../controllers/videoController";
import { onlyPrivate, uploadVideo } from "../middlewares";


const videoRouter = express.Router();

//Upload
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

// Edit Video
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Delete Video
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;