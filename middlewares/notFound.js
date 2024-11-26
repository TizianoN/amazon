function notFound(req, res, next) {
  res.status(404);
  res.json({
    message: 'Page not found',
  });
}

module.exports = notFound;
