import { CreateProductUseCase } from './create-product';
import { InMemoryProductsRepository } from '@/domain/stock/application/repositories/in-memory-products-repository';

let productsRepository: InMemoryProductsRepository;
let createProduct: CreateProductUseCase;

beforeEach(() => {
  productsRepository = new InMemoryProductsRepository();
  createProduct = new CreateProductUseCase(productsRepository);
});

test('Deve criar um novo produto', async () => {
  const product = await createProduct.execute({
    name: 'Produto Teste',
    description: 'Descrição do produto',
    quantity: 10,
    minimumQuantity: 5,
    price: 100,
  });

  expect(product).toHaveProperty('id');
  expect(productsRepository.items).toContainEqual(product);
});
