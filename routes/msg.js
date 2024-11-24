
var express = require('express');
var router = express.Router();
const db = require("../core/mysql");
/* GET home page. */
//新增
router.post('/', async function (request, resposne, next) {
    try {
        let insertParmas = [
            Number(request.body.x),
            Number(request.body.y),
            request.body.name,
            request.body.msg
        ]
        let insertSql = "INSERT INTO allmsg (`x`,`y`,`name`,`msg`)";
        insertSql += " values(?,?,?,?);";
        let resultInset = await db.exec(insertSql, insertParmas);

        if (resultInset && resultInset.affectedRows >= 1) {
            resposne.json({
                code: 200,
                msg: "保存成功",
                data: resultInset

            })
        } else {
            resposne.json({
                code: 200,
                msg: "保存失败",
            })
        }
    } catch (error) {
        resposne.json({
            code: -200,
            msg: "保存失败",
            error
        })
    }
});
//查询所有
router.get('/', async function (request, resposne, next) {
    try {
        let selectSql = "SELECT * FROM allmsg";
        let resultSelect = await db.exec(selectSql);
        resposne.json({
            code: 200,
            msg: "查询成功",
            data: resultSelect
        })
    } catch (error) {
        resposne.json({
            code: -200,
            msg: "查询失败",
            error
        })
    }
});
//根据x,y查询
router.get('/xy', async function (request, resposne, next) {
    try {
        let selectSql = "SELECT * FROM allmsg where x=? and y=?";
        let resultSelect = await db.exec(selectSql, [Number(request.query.x), Number(request.query.y)]);
        resposne.json({
            code: 200,
            msg: "查询成功",
            data: resultSelect
        })
    } catch (error) {
        resposne.json({
            code: -200,
            msg: "查询失败",
            error
        })
    }
});

module.exports = router;