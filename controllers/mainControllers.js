const mainController = {};

mainController.home = (req, res) => {
  res.render('index');
};

mainController.about = (req, res) => {
  res.render('about');
};

mainController.contact = (req, res) => {
  res.render('contact');
};

module.exports = mainController;
