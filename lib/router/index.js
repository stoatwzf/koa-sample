const Router = require('koa-router');
const router = new Router();

router.get('/', async ctx => {
  ctx.body = 'index';
});
router.get('/detail', async ctx => {
	ctx.body = 'detail';
});
router.get('/about', async ctx => {
	ctx.body = 'about'
});

module.exports = router.routes();