const Router = require('koa-router');
const router = new Router();

router.get('/', async ctx => {
  ctx.body = 'page';
});
router.get('/detail', async ctx => {
	ctx.body = 'page/detail';
});
router.get('/contact', async ctx => {
	ctx.body = 'page/contact';
});

module.exports = router.routes();