import * as Joi from 'joi';
import {BadRequestError} from '../common/errors';
import obDb from '../obDb';
import {STATUS_CODES} from '../common/constant';

export async function query(ctx, next) {
    const validatorSchema = Joi.object().keys({
        pageSize: Joi.number().max(50).required(),
        pageNumber: Joi.number().required(),
        userId: Joi.string().required(),
    }).required();
    const {error: validatorError} = Joi.validate(ctx.request.body, validatorSchema, {allowUnknown: true});
    if (validatorError) {
        throw new BadRequestError();
    }

    const {
        pageSize,
        pageNumber,
        userId
    } = ctx.request.body;

    const contentCount = await obDb
        .countDistinct({contentCount: 'content_id'})
        .from('comments')
        .where({user_id: userId})
        .then((rows) => rows[0].contentCount);

    const commentCount = await obDb
        .count({commentCount: 'id'})
        .from('comments')
        .where({user_id: userId})
        .then((rows) => rows[0].commentCount);


    const contentIds = await obDb
        .select('content_id')
        .from('comments').where({user_id: userId})
        .groupBy('content_id')
        .orderBy('content_id', 'desc')
        .limit(pageSize)
        .offset((pageNumber - 1) * pageSize)
        .then(rows => rows.map((r) => r.content_id))

    const comments = await obDb
        .select({
            id: 'id',
            content: 'content',
            userId: 'user_id',
            contentId: 'content_id',
            postDate: 'post_date'
        })
        .from('comments')
        .where({user_id: userId})
        .whereIn('content_id', contentIds);

    const contents = await obDb
        .select({
            id: 'id',
            title: 'title',
            contentType: 'content_type',
            publishedAt: 'published_at',
        })
        .orderBy('published_at', 'desc')
        .from('contents')
        .whereIn('id', contentIds);

    ctx.body = {
        statusCode: STATUS_CODES.SUCCESS,
        contentCount,
        commentCount,
        comments,
        contents,
    }
}
