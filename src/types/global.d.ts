export {  };

declare global {
    interface CustomJwtSessionClaims {
        id?: string;
        name?: string;
        email?: string;
        imageUrl?: string;
    }
}