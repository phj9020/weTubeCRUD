import routes from '../routes';
import Video from '../models/Video';
import Comment from '../models/Comment';


export const home = async(req, res) => {
    try {
        // Bring all Videos from DB
        const videos = await Video.find({}).sort({ _id : -1});
        res.render("home",{pageTitle: "Home", videos});
    } catch(error) {
        console.log(error);
        res.render("home",{pageTitle: "Home", videos});
    }
}


export const search = async(req, res) => {
    const {
        query: {term : searchingBy}
    } = req;

    let videos = [];
    try {
      videos = await Video.find({title: {$regex: searchingBy, $options:"i"}})
    } catch(error) {
        console.log(error);
    }
    res.render("search", {pageTitle: "Search", searchingBy, videos});
}

// Upload Video

export const getUpload = (req, res) => {
    res.render("upload", {pageTitle: "Upload"});
}

export const postUpload = async(req, res) => {
    const { 
        body : { title, description },
        file : { path }
    } = req;
    
    const newVideo = await Video.create({
        fileUrl : path,
        title,
        description,
        creator: req.user.id
    })
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id))
}

// Video Detail

export const videoDetail = async(req, res) => {
    const {
        params : { id }
    } = req;
    try {
        const video = await Video.findById(id)
        .populate('creator')
        .populate('comments');
        // console.log(video.creator)
        res.render("videoDetail", {pageTitle: video.title, video });

    } catch(error) {
        res.redirect(routes.home);
    }
}

// Edit Video 

export const getEditVideo = async(req, res) => {
    const { 
        params : { id }
    } = req;
    // console.log(id);
    
    try { 
        const video = await Video.findById(id);
        console.log(video.creator)
        console.log(req.user.id)
        console.log(video.creator !== req.user.id)
        //찾은 비디오에서 creator의 id와 로그인 한 id가 같지 않으면 edit 방지
        if(video.creator != req.user.id) {
            throw Error();
        } else { 
            res.render("editVideo", {pageTitle: `Edit ${video.title}`, video})
        }
    } catch(error) {
        console.log(error)
        res.redirect(routes.home);
    }
}


export const postEditVideo = async(req, res) => {
    const { 
        params : { id },
        body : { title, description}
    } = req;
    
    try {
        await Video.findOneAndUpdate({ _id: id }, {title, description});
        res.redirect(routes.videoDetail(id));
    } catch(error) {
        res.redirect(routes.home);
    }
}

// Delete Video

export const deleteVideo = async(req, res) => {
    const {
        params: { id } 
    }= req;
    try {
        const video = await Video.findById(id);
        if(video.creator != req.user.id) {
            throw Error();
        } else {
            // find video and delete it 
            await Video.findOneAndRemove( {_id : id});
        }
    } catch(error) {
        console.log(error);
    }
    res.redirect(routes.home);
}

// Register Video View
export const postRegisterView = async (req, res) => {
    const {
        params: { id }
      } = req;
      
    // find video, if finds it add view count and save video
    try {
        const video = await Video.findById(id);
        video.views += 1; 
        video.save();
        res.status(200);
    } catch (error) {
        res.status(400);
    } finally {
        res.end();
    }
};

// Add Comment
export const postAddComment = async (req, res) => {
    const {
        params: { id },
        body : { comment },
        user
    }= req;
    try {
        const video = await Video.findById(id);
        const newComment = await Comment.create({
            text: comment,
            creator: user.id
        });
        
        // console.log(user.id);
        video.comments.push(newComment.id);
        video.save();
    }catch (error) {
        res.status(400);
    } finally { 
        res.end();
    }
}

export const postDeleteComment = async(req,res)=> {
    const {
        params: { id },
        body : { selectedOne }
    }= req;
    try {
        const video = await Video.findById(id);
        const selectedComment = selectedOne;
        video.comments.pop(selectedComment);
        video.save();
    
    } catch (error) {
        res.status(400);
    } finally {
        res.end();
    }
}