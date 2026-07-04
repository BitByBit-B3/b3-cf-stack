export type AppErrorCode =
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'VALIDATION_ERROR'
  | 'CONFLICT'
  | 'INTERNAL_ERROR'
  | 'RATE_LIMITED'

export class AppError extends Error {
  readonly code: AppErrorCode
  readonly status: number

  constructor(code: AppErrorCode, message: string, status?: number) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.status = status ?? httpStatus(code)
  }
}

function httpStatus(code: AppErrorCode): number {
  switch (code) {
    case 'NOT_FOUND': return 404
    case 'UNAUTHORIZED': return 401
    case 'FORBIDDEN': return 403
    case 'VALIDATION_ERROR': return 400
    case 'CONFLICT': return 409
    case 'RATE_LIMITED': return 429
    case 'INTERNAL_ERROR': return 500
  }
}
