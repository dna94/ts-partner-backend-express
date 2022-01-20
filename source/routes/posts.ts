import express from 'express';
import controller from '../controllers/posts';
const router = express.Router();

//Test
router.get('/try', controller.tryEncription);
router.get('/tryget', controller.tryGet);
router.post('/trypost', controller.tryPost);
router.get('/testsso', controller.testSSO);


//Routes
router.post('/postsso', controller.postSSO);
router.post('/addcart', controller.addCart);
router.get('/confirmorder', controller.confirmOrder);

/*
router.get('/posts', controller.getPosts);
router.get('/posts/:id', controller.getPost);
router.put('/posts/:id', controller.updatePost);
router.delete('/posts/:id', controller.deletePost);
router.post('/posts', controller.addPost);
*/

export = router;
