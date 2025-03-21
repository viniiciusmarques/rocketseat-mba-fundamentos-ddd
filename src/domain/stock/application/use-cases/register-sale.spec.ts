import { RegisterSaleUseCase } from './register-sale';
import { InMemoryProductsRepository } from '@/domain/stock/application/repositories/in-memory-products-repository';
import { InMemorySalesRepository } from '@/domain/stock/application/repositories/in-memory-sales-repository';
import { Product } from '@/domain/stock/enterprise/entities/product';

let productsRepository: InMemoryProductsRepository;
let salesRepository: InMemorySalesRepository;
let registerSale: RegisterSaleUseCase;

beforeEach(() => {
  productsRepository = new InMemoryProductsRepository();
  salesRepository = new InMemorySalesRepository();
  registerSale = new RegisterSaleUseCase(productsRepository, salesRepository);
});

test('Deve registrar uma venda e reduzir o estoque', async () => {
  const product = new Product({
    name: 'Produto Teste',
    description: 'Descrição',
    quantity: 10,
    minimumQuantity: 2,
    price: 100,
    createdAt: new Date(),
  });

  await productsRepository.create(product);

  const sale = await registerSale.execute({
    productId: product.id,
    quantitySold: 3,
    totalPrice: 300,
  });

  expect(sale).toHaveProperty('id');
  expect(product.props.quantity).toBe(7);
});
