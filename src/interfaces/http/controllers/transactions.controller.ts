import {
  Controller,
  Post,
  Body,
  Param,
  HttpException,
  Get,
} from '@nestjs/common';

import { CreateTransactionUseCase } from 'src/application/use-cases/transactions/create-transaction.use-case';
import { GetTransactionByIdUseCase } from 'src/application/use-cases/transactions/get-transaction-by-id.use-case';
import { ProcessPaymentUseCase } from 'src/application/use-cases/transactions/process-payment.use-case';
import { mapDomainErrorToHttp } from 'src/interfaces/mappers/domain-error.mapper';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly processPaymentUseCase: ProcessPaymentUseCase,
    private readonly getTransactionByIdUseCase: GetTransactionByIdUseCase,
  ) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    const result = await this.getTransactionByIdUseCase.execute(id);

    if (!result.ok) {
      const httpError = mapDomainErrorToHttp(result.error);
      throw new HttpException(httpError.body, httpError.status);
    }

    return {
      id: result.value.id,
      status: result.value.getStatus(),
      amount: result.value.amount,
    };
  }

  @Post()
  async create(@Body() body: { productId: string; customerEmail: string }) {
    const result = await this.createTransactionUseCase.execute(body);

    if (!result.ok) {
      const httpError = mapDomainErrorToHttp(result.error);
      throw new HttpException(httpError.body, httpError.status);
    }

    return result.value;
  }

  @Post(':id/process-payment')
  async processPayment(
    @Param('id') id: string,
    @Body() body: { cardToken: string },
  ) {
    const result = await this.processPaymentUseCase.execute({
      transactionId: id,
      cardToken: body.cardToken,
    });

    if (!result.ok) {
      const httpError = mapDomainErrorToHttp(result.error);
      throw new HttpException(httpError.body, httpError.status);
    }

    return result.value;
  }
}
