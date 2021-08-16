export class MinLengthError extends Error {
    constructor(private readonly minLength: number) {
        super(`Mínimo de ${minLength} caracteres`);
    }
}
