const Router = require('koa-router');
const router = new Router();

router.get('/', async ctx => {
	ctx.body = 'about';
});
router.get('/detail', async ctx => {
	ctx.body = 'about/detail';
});
router.get('/detail/:id', async ctx => {
	ctx.body = 'about/detail/id';
});

module.exports = router.routes();