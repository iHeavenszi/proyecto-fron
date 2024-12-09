export interface AuthResponse{
    body: {
        user: User;
        accessToken: string;
        refreshToken: string;
    };
}
export interface AuthResponseError{
    body:{
        error: string;
    };
}
export interface User{
    id: string;
    name: string;
    username: string;
}
export interface AccessTokenResponse{
    statuscode: number;
    body: {
        accessToken: string;
    },
    error?: string;
}
// types.ts
export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
     // Extender el tipo Product para incluir cantidad
  quantity?: number; // Opcional, ya que solo se usa en el carrito
  }
  