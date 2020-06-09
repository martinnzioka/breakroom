const { pool } = require('../database/database');

exports.createComment = async (req, res, next) => {
    try {
        const { comment, post_id, user_id } = req.body;
        const createdon = Date(Date.now()).toString();
        getComment = async (post_id, user_id) => {
            pool.query('SELECT comment_id, comment, post_id, user_id, createdon FROM comment WHERE post_id=$1 and user_id=$2', [post_id, user_id])
            .then((result) => {
                const response = result.rows[0];
                res.status(201).json({
                    status: 'success',
                    data: {
                      message: 'Comment sucessfully posted.',
                      comment_id: response.comment_id,
                      comment: response.comment,
                      post_id: response.post_id,
                      createdon: response.createdon,
                      createdby: response.user_id,
                    },
                  });
            }).catch((error) => {
                res.status(500).json({
                    status: 'Internal Server Error',
                    data: {
                      name: error.name,
                      code: error.code,
                      detail: error.detail,
                      stack: error.stack,
                    },
                  });
            });
        }
        pool.query('INSERT INTO comments(comment, post_id, user_id, createdon) VALUES($1, $2, $3, $4)',[comment, post_id, user_id, createdon])
            .then(() => {
                getComment(post_id, user_id);
            }).catch((error) => {
                res.status(500).json({
                    status: 'Internal Server Error',
                    data: {
                      name: error.name,
                      code: error.code,
                      detail: error.detail,
                      stack: error.stack,
                    },
                  });
            });
    } catch (error) {
        next(error);
    }
}

exports.updateComment = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}

exports.deleteComment = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}

exports.getComments = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}