import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { PaymentGateway } from 'src/application/ports/payment-gateway.port';

@Injectable()
export class WompiAdapter implements PaymentGateway {
  private readonly baseUrl = process.env.WOMPI_SANDBOX_URL;
  private readonly privateKey = process.env.WOMPI_PRIVATE_KEY;

  async charge(input: {
    amount: number;
    cardToken: string;
    customerEmail: string;
  }): Promise<
    | { status: 'APPROVED'; transactionId: string }
    | { status: 'DECLINED' }
  > {
    try {
      const response = await axios.post(
        `${this.baseUrl}/transactions`,
        {
          amount: input.amount,
          currency: 'COP',
          customer_email: input.customerEmail,
          payment_method: {
            type: 'CARD',
            token: input.cardToken,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.privateKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const wompiStatus = response.data.data.status;

      if (wompiStatus === 'APPROVED') {
        return {
          status: 'APPROVED',
          transactionId: response.data.data.id,
        };
      }

      return { status: 'DECLINED' };
    } catch (error) {
      return { status: 'DECLINED' };
    }
  }
}