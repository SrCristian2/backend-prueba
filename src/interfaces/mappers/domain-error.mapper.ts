import { DomainError } from 'src/domain/errors';

export interface HttpErrorResponse {
  status: number;
  body: {
    message: string;
    code: string;
  };
}

export function mapDomainErrorToHttp(error: DomainError): HttpErrorResponse {
  switch (error.code) {
    case 'INVALID_QUANTITY':
      return {
        status: 400,
        body: { message: error.message, code: error.code },
      };

    case 'INSUFFICIENT_STOCK':
      return {
        status: 409,
        body: { message: error.message, code: error.code },
      };

    case 'PRODUCT_NOT_FOUND':
      return {
        status: 404,
        body: { message: error.message, code: error.code },
      };

    default:
      return {
        status: 400,
        body: { message: error.message, code: error.code },
      };
  }
}
