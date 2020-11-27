module.exports = function () {
  return function (req, res) {
    req.session.destroy(() => {
      res.redirect("/");
    });
  };
};
