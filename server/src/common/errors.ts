import {STATUS_CODES} from '../../../common/constant';

export class RequireLoginError extends Error {
    statusCode = STATUS_CODES.NOT_LOGIN;
    message: string;

    constructor(message = '请先登录') {
        super();
        this.message = message;
    }
}

export class BadRequestError extends Error {
    statusCode = STATUS_CODES.BAD_REQUEST;
    message: string;

    constructor(message = '请求参数错误') {
        super();
        this.message = message;
    }
}

export class ForbiddenError extends Error {
    statusCode = STATUS_CODES.FORBIDDEN;
    message: string;

    constructor(message = '无访问权限') {
        super();
        this.message = message;
    }
}