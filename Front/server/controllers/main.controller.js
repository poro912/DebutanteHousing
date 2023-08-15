exports.main_get = async(req, res, next) => {
    try{
        res.status(200).send("HI🍨")
    } catch(e){
        throw Error(e)
    }
}