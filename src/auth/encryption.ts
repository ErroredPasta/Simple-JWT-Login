import { createPublicKey, publicEncrypt, constants } from "crypto";

export function encrypt(data: string, base64PublicKey: string): string {
    const publicKey = createPublicKey({
        key: Buffer.from(base64PublicKey, 'base64'),
        format: 'der',
        type: 'spki'
    });

    // Encrypt data
    const encrypted = publicEncrypt({
        key: publicKey,
        padding: constants.RSA_PKCS1_PADDING,
    }, Buffer.from(data));

    return encrypted.toString('base64');
}