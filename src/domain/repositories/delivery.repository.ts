import { Delivery } from '../entities/delivery.entity';

export interface DeliveryRepository {
  findById(id: string): Promise<Delivery | null>;
  save(delivery: Delivery): Promise<void>;
}
