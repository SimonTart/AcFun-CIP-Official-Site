import * as crypto from 'crypto';
import config from '../config';

export function encryptPassword(password) {
    return crypto.createHash('sha256').update(`${config.encryptPasswordSalt}${password}`).digest('hex');
}
