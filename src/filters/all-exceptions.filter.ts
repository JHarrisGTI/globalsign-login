import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	private readonly logger = new Logger(AllExceptionsFilter.name);

	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();

		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: 500;

		const message = exception.message || 'Internal server error';

		if (status === 404) {
			this.logger.error(`${request.method} ${request.url}`);
		} else {
			this.logger.error(`${request.method} ${request.url}`, exception.stack)
		}

		response.status(status).json({
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			error: message,
			...(process.env.NODE_ENV === 'development' && { stack: exception.stack }), // Include stack in development mode only
		});
	}
}
