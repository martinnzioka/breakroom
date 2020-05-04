const { pool } = require('../database/database');
const cloudinary = require('cloudinary').v2;

exports.createGif = async (req, res, next) => {
    try {
        // 'gif' should be upload link/path of media.
        const { title, gif } = req.body;
        cloudinary.uploader.upload(gif).then(
            async function(result) {
                const data = {
                    title: title,
                    gifurl: result.secure_url,
                    createdOn: result.created_at,
                    createdBy:  req.user.user_id,
                    gifdata: result

                };
                const values = Object.values(data);
                try {
                    await pool.query(`INSERT INTO gifPosts(title, gifurl, createdOn, createdby, gifdata) VALUES($1, $2, $3, $4, $5)`, values)
                    getGif(result.secure_url)
                } catch (error) {
                    res.status(400).json({
                        status: 'bad request',
                            message: {
                                name: error.name,
                                code: error.code,
                                detail: error.detail,
                                stack: error.stack
                            }
                    })
                }
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    status: 'bad request',
                    message: {
                        name: error.name,
                        code: error.code,
                        detail: error.detail,
                        stack: error.stack
                    }
                })
            }
        )
        async function getGif(url) {
            try {
                const data = await pool.query(`SELECT gif_id, title, gifurl, createdon FROM gifPosts WHERE gifurl = $1`, [url])
                const post = data.rows[0];
                res.status(201).json({
                    status: 'success',
                    data: {
                        messege: 'Gif created successfully',
                        gifId: post.gif_id,
                        title: post.title,
                        gif_url: post.gifurl,
                        created_on: post.createdon
                    }
                })
            } catch (error) {
                res.status(404),json({
                    status: 'not found',
                    message: {
                        name: error.name,
                        code: error.code,
                        detail: error.detail,
                        stack: error.stack
                    }
                })
            }
        }
    } catch (error) {
        next(error)
    }
}