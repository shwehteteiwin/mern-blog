const {Router} = require('express')
const {createPost, getPost, getPosts, getCastPosts, getUserPosts, editPost,deletePost} = require('../controllers/postController')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post('/',authMiddleware,createPost)
router.get('/',getPosts)
router.get('/:id',getPost)
router.get('/categories/:category',getCastPosts)
router.get('/users/:id',getUserPosts)
router.patch('/:id',authMiddleware,editPost)
router.delete('/:id',authMiddleware,deletePost)


module.exports = router