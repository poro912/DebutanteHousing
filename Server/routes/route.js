const userRouter = require('./user/user')
const friendRouter = require('./friend/friend')
const roomRouter = require('./room/room')
const storeRouter = require('./store/store')
const nftRouter = require('./nft/nft')
const itemRouter = require('./item/item')
const editRouter = require('./edit/edit')
const etcRouter = require('./etc/etc')


/**
 * 라우터 미들웨어 등록 부분
 * @todo 클라이언트에서 서버에 요청할 때 미들웨어에 등록된 경로에 맞춰야 한다.
 *       ex) 회원가입 등록 => '/user/signup' 요런 느낌
 */
exports.route = (app)=>{
    app.use('/user', userRouter);
    app.use('/friend', friendRouter);
    app.use('/room', roomRouter);
    app.use('/store', storeRouter);
    app.use('/nft', nftRouter);
    app.use('/item', itemRouter);
    app.use('/edit', editRouter);
    app.use('*', etcRouter);
}