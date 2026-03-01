import { Customer } from '../entities/customer.entity';

export interface CustomerRepository {
  findByEmail(email: string): Promise<Customer | null>;
  findById(id: string): Promise<Customer | null>;
  save(customer: Customer): Promise<void>;
}
