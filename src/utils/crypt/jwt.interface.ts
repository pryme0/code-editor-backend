export interface JwtPayloadInterface {
  id?: string;
  email?: string;
  organizationId?: string;
  role?: string;
  issuer?: string;
}

export interface JwtOptions {
  expiresIn?: string;
  algorithm?: string;
  audience?: string;
  subject?: string;
  issuer?: string;
  refreshIn?: string;
}
