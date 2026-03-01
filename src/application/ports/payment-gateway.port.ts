export interface PaymentGateway {
  charge(input: {
    amount: number;
    cardToken: string;
    customerEmail: string;
  }): Promise<
    { status: 'APPROVED'; transactionId: string } | { status: 'DECLINED' }
  >;
}
