// 잘못된 요청 시 return 404
exports.wrong = (req, res) => {
    res.status(404).send({msg:'잘못된 요청입니다!'})
};