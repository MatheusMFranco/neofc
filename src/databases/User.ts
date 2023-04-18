import BaseRepository from './BaseRepository';

export default class User extends BaseRepository {
    table = 'User';
    fields = [
        'language',
        'theme',
        'notification',
        'mode',
        'details',
        'custom',
    ];

    constructor() {
        super(table, fields);
    }
}
