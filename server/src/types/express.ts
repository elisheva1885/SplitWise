export interface JwtPayload {
  id: number;
  username: string;
  email: string;
  iat?: number;
  exp?: number;
}

declare module 'express' {
  interface Request {
    cookies: Record<string, string>;
    user?: JwtPayload;
  }
}
