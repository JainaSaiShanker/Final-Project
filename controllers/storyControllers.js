const { users } = require('moongose/models');
const model = require('../models/story');

const storyController = {};

function getDistinctCategories(stories) {
  const categories = new Set();
  stories.forEach((story) => {
    categories.add(story.topic);
  })
  return Array.from(categories).sort();
}
storyController.index = (req, res, next) => {
  model.find()
  .then((stories) => {
    const distinctCategories = getDistinctCategories(stories);
    res.render('./story/index', { stories, categories: distinctCategories });
  })
  .catch((err) => {
    next(err);
  });
};

storyController.new = (req, res) => {
  res.render('./story/new');
};

storyController.create = (req, res) => {
  
  let story = new model(req.body);
  story.save()
  .then((story) => {
    res.redirect('/stories');
  })
  .catch((err) => {
    if(err.name === 'ValidationError') {
      err.status  = 400;
    }
    next(err);
  });
};


storyController.show = (req, res, next) => {
  let id = req.params.id;
  if(!id.match(/^[0-9a-fA-F]{24}$/)) {
    let err = new Error('Invalid id: ' + id);
    err.status = 404;
    return next(err);
  }
  model.findById(id)
  .then((story) => {
    if (!story) {
      let err = new Error('Story not found with id: ' + id);
      err.status = 404;
      next(err);
    } else {
      res.render('./story/show', { story });
    }
  })
  .catch((err) => {
    next(err);
  })
};

storyController.edit = (req, res, next) => {
  let id = req.params.id;
  if(!id.match(/^[0-9a-fA-F]{24}$/)) {
    let err = new Error('Invalid id: ' + id);
    err.status = 404;
    return next(err);
  }
  model.findById(id)
  .then((story) => {
    if (!story) {
      let err = new Error('Story not found with id: ' + id);
      err.status = 404;
      next(err);
    } else {
      res.render('./story/edit', { story });
    }
  })
  .catch((err) => {
    next(err);
  })
 };

storyController.update = (req, res, next) => {
  let story = req.body;
  let id = req.params.id;
  if(!id.match(/^[0-9a-fA-F]{24}$/)) {
    let err = new Error('Invalid id: ' + id);
    err.status = 400;
    return next(err);
  }
  model.findByIdAndUpdate(id, story, {userFindAndModify: false, runValidators: true})
  .then((story) => {
    if (!story) {
      let err = new Error('Story not found with id: ' + id);
      err.status = 404;
      next(err);
    } else {
      res.redirect('/stories/' + id);
    }
  })
  .catch((err) => {
    if(err.name === 'ValidationError') {
      err.status  = 400;
      next(err);
    }
  })
};
 

storyController.delete = (req, res, next) => {
  let id = req.params.id;
  if(!id.match(/^[0-9a-fA-F]{24}$/)) {
    let err = new Error('Invalid id: ' + id);
    err.status = 400;
    return next(err);
  }
  model.findByIdAndDelete(id,{userFindAndModify: false, runValidators: true})
  .then((story) => {
    if (!story) {
      let err = new Error('Story not found with id: ' + id);
      err.status = 404;
      next(err);
    } else {
      res.redirect('/stories');
    }
  })
  .catch((err) => {
    next(err);
  })
};
  
module.exports = storyController;
