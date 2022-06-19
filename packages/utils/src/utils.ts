import Ajv from "ajv";

export const createAjvInstance = (): Ajv => {
    return new Ajv({
        allErrors: true,
        multipleOfPrecision: 8
    });
}