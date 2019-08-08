const express = require('express');
const router = express.Router();
const layout = require('../views/layout');
const { Page } = require('../models');
const { addPage } = require('../views');

router.get('/', (req, res, next) => {
  res.send(layout(' '));
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.post('/', async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  const page = new Page({
    title: title,
    content: content,
  });
  // res.json(req.body);

  try {
    await page.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
