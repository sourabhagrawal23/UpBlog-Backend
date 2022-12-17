const { validationResult } = require('express-validator/check');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    Post.find()
    .then(posts => {
        res.status(200).json({message: 'Fetched posts successfully', posts: posts});
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })

    //dummy
    // res.status(200).json({
    //     posts: [
    //         {
    //             _id: '1',
    //             title: 'First Post',
    //             content: 'This is the first post!',
    //             imageUrl: 'images/img.png',
    //             creator: {
    //                 name: 'Sourabh'
    //             },
    //             createdAt: new Date()
    //         }]
    // });
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        const error = new Error('Validation failed, entered data in incorrect.');
        error.statusCode = 422;
        throw error;

        // return res.status(422).json({
        //     message: 'Validation failed, entered data is incorrect.',
        //     errors: errors.array()
        // })
    }
    if(!req.file) {
        const error = new Error('No image provided.');
        error.statusCode = 422;
        throw error;
    }

    const imageUrl = req.file.path.replace("\\" ,"/");   
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
        creator: { name: 'Sourabh' }
    });

    post.save().then(result => {
        //Create post in db
        res.status(201).json({
            message: 'Post created successfully!',
            post: result
        });
    })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getPost = (req,res,next) => {
    const postId = req.params.postId;
    Post.findById(postId)
    .then(post => {
        if(!post) {
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({message: 'Post fetched', post: post});
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}