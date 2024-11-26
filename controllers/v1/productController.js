const products = require('../../data/products');

function index(req, res) {
  const oldProducts = products.map((product) => convertToOldProduct(product));
  res.json(oldProducts);
}

function show(req, res) {
  const id = parseInt(req.params.id);
  const product = products.find((product) => product.id === id);

  if (!product) {
    const error = new Error('Product not found');
    error.status = 404;
    throw error;
  }

  res.json(convertToOldProduct(product));
}

function store(req, res) {
  const { name, amount, currency, colors } = req.body;

  if (!name || !amount || !currency || !colors?.length) {
    const error = new Error('Invalid body params');
    error.status = 400;
    throw error;
  }

  const id = products.at(-1).id + 1;

  const newProduct = convertToNewProduct({ id, name, amount, currency, colors });
  products.push(newProduct);

  res.status(201).json(products);
}

function update(req, res) {
  const id = parseInt(req.params.id);

  const newProduct = products.find((product) => product.id === id);

  if (!newProduct) {
    const error = new Error('Product not found');
    error.status = 404;
    throw error;
  }

  const { name, amount, currency, colors } = req.body;

  if (!name || !amount || !currency || !colors?.length) {
    const error = new Error('Invalid body params');
    error.status = 400;
    throw error;
  }

  newProduct.name = name;
  newProduct.price.amount = amount;
  newProduct.price.currency = currency;
  newProduct.discount.type = '€';
  newProduct.discount.amount = 0;
  newProduct.colors = colors;

  res.json(newProduct);
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

function convertToOldProduct(newProduct) {
  let finalPrice = newProduct.price.amount;

  if (newProduct.discount.amount) {
    if (newProduct.discount.type === '€') {
      finalPrice -= newProduct.discount.amount;
    } else {
      finalPrice = finalPrice - (finalPrice * newProduct.discount.amount) / 100;
    }
  }

  const oldProduct = {
    name: newProduct.name,
    amount: finalPrice,
    currency: newProduct.price.currency,
    colors: newProduct.colors,
  };

  return oldProduct;
}

function convertToNewProduct(oldProduct) {
  const newProduct = {
    id: oldProduct.id,
    name: oldProduct.name,
    price: {
      amount: oldProduct.amount,
      currency: oldProduct.currency,
    },
    discount: {
      type: '€',
      amount: 0,
    },
    colors: oldProduct.colors,
  };

  return newProduct;
}

module.exports = { index, show, store, update, destroy };
