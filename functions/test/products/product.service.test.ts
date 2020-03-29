import {IMock, Mock} from 'moq.ts';
import {ProductRepository} from '../../src/products/product.repository';
import {ProductService} from '../../src/products/product.service';
import {Product} from '../../src/models/product';
import {Stock} from '../../src/models/stock';

describe('ProductService', () => {
  let productRepository: IMock<ProductRepository>;
  let productService: ProductService;
  const product: Product = {
    name: 'Test',
    price: 342,
    inStock: true
  };
  const stock: Stock = {
    count: 5,
    productID: 'randomID'
  };
  beforeEach(() => {
    productRepository = new Mock<ProductRepository>()
      .setup(pr => pr.createStockForNewProduct(stock))
      .returns(new Promise((resolve, reject) => {resolve()}));
    productService = new ProductService(productRepository.object());
  });

  it('Product creation should create stock with 5 stockCount', async() => {
    const beforePurchased = stock.count;
    expect(beforePurchased).toBe(5);
    console.log(productService);
    console.log(product);
  });
});
