
import {
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotAcceptableException,
    RequestTimeoutException,
    ConflictException,
    GoneException,
    HttpVersionNotSupportedException,
    PayloadTooLargeException,
    UnsupportedMediaTypeException,
    UnprocessableEntityException,
    InternalServerErrorException,
    NotImplementedException,
    ImATeapotException,
    MethodNotAllowedException,
    BadGatewayException,
    ServiceUnavailableException,
    GatewayTimeoutException,
    PreconditionFailedException,
    HttpStatus,
    NotFoundException,
    HttpException,


} from '@nestjs/common';
import { JsonWebTokenError } from 'jsonwebtoken';
import { DatabaseError, ForeignKeyConstraintError, ValidationError } from 'sequelize';

/**
 * Handles Sequelize errors and converts them to appropriate exceptions.
 * 
 * @param {any} error - The Sequelize error object.
 */
export const handleSequelizeError = (error: any) => {
    console.log("error", error,)

    if (error?.name == 'NotAuthorizedException') {
        throw new UnauthorizedException({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: error.message,
        });
    }

    if (error instanceof ForeignKeyConstraintError) {
        throw new ConflictException({
            statusCode: HttpStatus.BAD_REQUEST,
            message: error.message,
        });
    }

    else if (error instanceof ConflictException) {

        throw new ConflictException({
            statusCode: HttpStatus.CONFLICT,
            message: error.message,
        });

    }
    else if (error instanceof BadRequestException) {

        throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            message: error.message,
        });

    } else if (error instanceof NotAcceptableException) {
        throw new NotAcceptableException({
            statusCode: HttpStatus.NOT_ACCEPTABLE,
            message: error.message,
        });
    }
    else if (error instanceof HttpException) {

        throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            message: error.message,
        });

    }

    else if (error instanceof DatabaseError) {
        throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            message: error.message,
        });

    }
    else if (error instanceof ValidationError) {
        throw new UnprocessableEntityException({
            statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            message: error.message,
        });
    } else if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: error.message,
        });
    } else if (error instanceof ForbiddenException) {
        throw new ForbiddenException({
            statusCode: HttpStatus.FORBIDDEN,
            message: error.message,
        });
    } else if (error instanceof NotFoundException) {
        throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
        });
    } else if (error instanceof RequestTimeoutException) {
        throw new RequestTimeoutException({
            statusCode: HttpStatus.REQUEST_TIMEOUT,
            message: error.message,
        });
    } else if (error instanceof GoneException) {
        throw new GoneException({
            statusCode: HttpStatus.GONE,
            message: error.message,
        });
    } else if (error instanceof HttpVersionNotSupportedException) {
        throw new HttpVersionNotSupportedException({
            statusCode: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
            message: error.message,
        });
    } else if (error instanceof PayloadTooLargeException) {
        throw new PayloadTooLargeException({
            statusCode: HttpStatus.PAYLOAD_TOO_LARGE,
            message: error.message,
        });
    } else if (error instanceof UnsupportedMediaTypeException) {
        throw new UnsupportedMediaTypeException({
            statusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
            message: error.message,
        });
    } else if (error instanceof NotImplementedException) {
        throw new NotImplementedException({
            statusCode: HttpStatus.NOT_IMPLEMENTED,
            message: error.message,
        });
    } else if (error instanceof ImATeapotException) {
        throw new ImATeapotException({
            statusCode: HttpStatus.I_AM_A_TEAPOT,
            message: error.message,
        });
    } else if (error instanceof MethodNotAllowedException) {
        throw new MethodNotAllowedException({
            statusCode: HttpStatus.METHOD_NOT_ALLOWED,
            message: error.message,
        });
    } else if (error instanceof BadGatewayException) {
        throw new BadGatewayException({
            statusCode: HttpStatus.BAD_GATEWAY,
            message: error.message,
        });
    } else if (error instanceof ServiceUnavailableException) {
        throw new ServiceUnavailableException({
            statusCode: HttpStatus.SERVICE_UNAVAILABLE,
            message: error.message,
        });
    } else if (error instanceof GatewayTimeoutException) {
        throw new GatewayTimeoutException({
            statusCode: HttpStatus.GATEWAY_TIMEOUT,
            message: error.message,
        });
    } else if (error instanceof PreconditionFailedException) {
        throw new PreconditionFailedException({
            statusCode: HttpStatus.PRECONDITION_FAILED,
            message: error.message,
        });
    } else {
        throw new InternalServerErrorException({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
}

export const handleAuthGuardError = (error: any) => {
    console.log("error", error,)
    if (error?.name == 'NotAuthorizedException') {
        throw new UnauthorizedException({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: error.message,
        });
    }
    else if (error instanceof BadRequestException) {
        throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            message: error.message,
        });

    }
    else if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: error.message,
        });
    } else if (error instanceof NotFoundException) {
        throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
        });
    } else {
        throw new UnauthorizedException({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Authorization failed',
        });
    }
}