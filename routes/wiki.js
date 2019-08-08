const express = require('express');
const router = express.Router();
const layout = require('../views/layout');
const { Page } = require('../models');
const { addPage } = require('../views');

router.get('/', (req, res, next) => {
  res.send(layout(' ')); //update this to be something
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    // const page = await Page.findAll();
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    console.log('page', page);
    res.json(page);
  } catch (error) {
    next(error);
  }
  // res.send(`hit dynamic route at ${req.params.slug}`);
});

router.post('/', async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  const page = new Page({
    title: title,
    content: content,
  });
  // res.json(req.body);
  console.log(page);
  try {
    await page.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
