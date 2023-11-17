import {
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  Logger,
} from '@nestjs/common';

const logger = new Logger('handleError');

const listOfErrors = [
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
];

export const handlerError = (error: Error) => {
  if (listOfErrors.includes(error.constructor as any)) {
    throw error;
  }

  logger.error(error);
  throw new BadRequestException('Something went wrong with the request');
};
