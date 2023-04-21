import BaseRepository from './BaseRepository';
import { User } from '../models/User';

export default class UserRepository extends BaseRepository<User> {
    constructor() {
        super('User', [
            'dark',
            'notification',
            'dropdown',
            'details',
            'custom',
            'language',
        ]);
    }
}
