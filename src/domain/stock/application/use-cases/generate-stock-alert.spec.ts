import { GenerateStockAlertUseCase } from './generate-stock-alert';
import { InMemoryProductsRepository } from '@/domain/stock/application/repositories/in-memory-products-repository';
import { InMemoryStockAlertsRepository } from '@/domain/stock/application/repositories/in-memory-stock-alerts-repository';
import { Product } from '@/domain/stock/enterprise/entities/product';

let productsRepository: InMemoryProductsRepository;
let stockAlertsRepository: InMemoryStockAlertsRepository;
let generateStockAlert: GenerateStockAlertUseCase;

beforeEach(() => {
  productsRepository = new InMemoryProductsRepository();
  stockAlertsRepository = new InMemoryStockAlertsRepository();
  generateStockAlert = new GenerateStockAlertUseCase(productsRepository, stockAlertsRepository);
});

test('Deve gerar um alerta de estoque quando abaixo do mínimo', async () => {
  const product = new Product({
    name: 'Produto Teste',
    description: 'Descrição',
    quantity: 1,
    minimumQuantity: 5,
    price: 100,
    createdAt: new Date(),
  });

  await productsRepository.create(product);
  const alert = await generateStockAlert.execute({ productId: product.id });

  expect(alert).toHaveProperty('id');
  expect(stockAlertsRepository.items).toContainEqual(alert);
});
