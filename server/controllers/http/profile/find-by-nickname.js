const pool = require('../../../config/db')


const findByNickname = async (req, res) => {
    const {nickname} = req.params
    let client
    if (!nickname) return res.status(404).json([])
    try {
        client = await pool.connect()
        const result = await client.query(`SELECT nickname FROM users WHERE nickname ILIKE $1 || '%' OR nickname % $1 ORDER BY similarity(nickname, $1) DESC LIMIT 10;`,[nickname])
        res.status(200).json({foundUsers:result.rows})
    } catch (e) {
        console.log(e);
        return res.status(500).json({error:'Ошибка на сервере'})
    } finally {
        if (client) {
            client.release()
        }
    }
}

module.exports={findByNickname}