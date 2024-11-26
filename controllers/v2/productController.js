const products = require('../../data/products');

function index(req, res) {
  res.json(products);
}

function show(req, res) {
  const id = parseInt(req.params.id);
  const product = products.find((product) => product.id === id);

  if (!product) {
    const error = new Error('Product not found');
    error.status = 404;
    throw error;
  }

  res.json(product);
}

function store(req, res) {
  const { name, price, discount, currency, colors } = req.body;

  if (!name || !price?.amount || !price?.currency || !discount?.type || !discount?.amount || !colors?.length) {
    const error = new Error('Invalid body params');
    error.status = 400;
    throw error;
  }

  const id = products.at(-1).id + 1;

  const newProduct = { name, price, discount, currency, colors };
  products.push(newProduct);

  res.status(201).json(products);
}

function update(req, res) {
  const id = parseInt(req.params.id);

  const product = products.find((product) => product.id === id);

  if (!product) {
    const error = new Error('Product not found');
    error.status = 404;
    throw error;
  }

  const { name, price, discount, currency, colors } = req.body;

  if (!name || !price?.amount || !price?.currency || !discount?.type || !discount?.amount || !colors?.length) {
    const error = new Error('Invalid body params');
    error.status = 400;
    throw error;
  }

  product.name = name;
  product.price.amount = price.amount;
  product.price.currency = price.currency;
  product.discount.type = discount.type;
  product.discount.amount = discount.amount;
  product.colors = colors;

  res.json(product);
}

function destroy(req, res) {
  const id = parseInt(req.params.id);

  const product = products.find((product) => product.id === id);

  if (!product) {
    const error = new Error('Product not found');
    error.status = 404;
    throw error;
  }

  const productIndex = products.indexOf(product);
  products.splice(productIndex, 1);

  res.sendStatus(204);
}

module.exports = { index, show, store, update, destroy };
