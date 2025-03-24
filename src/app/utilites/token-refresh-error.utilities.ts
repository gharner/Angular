export class TokenRefreshError extends Error {
	statusCode: number;
	isTokenRefreshFailure: boolean;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		this.isTokenRefreshFailure = true;

		Object.setPrototypeOf(this, TokenRefreshError.prototype);
	}
}
