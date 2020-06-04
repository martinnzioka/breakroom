const { pool } = require('../database/database');

exports.createArticle = async (req, res, next) => {
  try {
    const articleData = {
      title: req.body.title,
      article: req.body.article,
      createdon: Date(Date.now()).toString(),
      createdby: req.user.user_id,
    };
    const getArticle = async (data) => {
      const { title, article, createdon } = data;
      pool.query('SELECT article_id, title, article, createdon FROM articlePosts WHERE title = $1 AND article = $2 AND createdon = $3', [title, article, createdon]).then(
        (result) => {
          const post = result.rows[0];
          res.status(201).json({
            status: 'success',
            data: {
              message: 'Article sucessfully posted.',
              article_id: post.article_id,
              title: post.title,
              article: post.article,
              createdon: post.createdon,
              createdby: post.createdby,
            },
          });
        },
      ).catch(
        (error) => {
          res.status(500).json({
            status: 'Internal Server Error',
            data: {
              name: error.name,
              code: error.code,
              detail: error.detail,
              stack: error.stack,
            },
          });
        },
      );
    };
    const values = Object.values(articleData);
    pool.query('INSERT INTO articlePosts(title, article, createdon, createdby) VALUES($1, $2, $3, $4)', values).then(
      () => {
        getArticle(articleData);
      },
    ).catch(
      (error) => {
        res.status(400).json({
          ststus: 'bad request',
          data: {
            message: 'Article can not be empty',
            name: error.name,
            code: error.code,
            detail: error.detail,
            stack: error.stack,
          },
        });
      },
    );
  } catch (error) {
    next(error);
  }
};

exports.updateArticle = async (req, res, next) => {
  try {
    const { title, article } = req.body;
    const articleId = req.params.article_id;
    const getArticle = async () => {
      pool.query('SELECT article_id, title, article, createdon FROM articlePosts WHERE title = $1 AND article = $2 AND article_id = $3', [title, article, articleId]).then(
        (result) => {
          const post = result.rows[0];
          res.status(201).json({
            status: 'created',
            data: {
              message: 'Article sucessfully updated.',
              article_id: post.article_id,
              title: post.title,
              article: post.article,
              createdon: post.createdon,
              createdby: post.createdby,
            },
          });
        },
      ).catch(
        (error) => {
          res.status(500).json({
            status: 'Internal Server Error',
            data: {
              name: error.name,
              code: error.code,
              detail: error.detail,
              stack: error.stack,
            },
          });
        },
      );
    };
    pool.query('UPDATE articlePosts SET title = $1, article = $2 WHERE article_id = $3', [title, article, articleId]).then(
      () => {
        getArticle();
      },
    ).catch(
      (error) => {
        res.status(400).json({
          ststus: 'bad request',
          data: {
            message: 'Empty title or article',
            article_id: articleId,
            name: error.name,
            code: error.code,
            detail: error.detail,
            stack: error.stack,
          },
        });
      },
    );
  } catch (error) {
    next(error);
  }
};

exports.deleteArticle = async (req, res, next) => {
  try {
    const articleId = req.params.article_id;
    if (!articleId) return;
    try {
      await pool.query('DELETE FROME articlePosts WHERE article_id = $1', [articleId]);
      res.status(200).json({
        status: 'success',
        data: {
          message: 'Article successfully deleted.',
        },
      });
    } catch (error) {
      res.status(404).json({
        ststus: 'not found',
        data: {
          message: 'Article not found',
          article_id: articleId,
          name: error.name,
          code: error.code,
          detail: error.detail,
          stack: error.stack,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
