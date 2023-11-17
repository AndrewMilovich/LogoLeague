import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    console.log(exception);

    const { message } = exception.getResponse() as any;

    response.status(status).json({
      status_code: status,
      result: null,
      error: message,
    });
  }
}
