import BaseRepository from './BaseRepository';
import { Bet } from '../models/Bet';

export default class BetRepository extends BaseRepository<Bet> {
    constructor() {
        super('Bet', [
            'bust',
            'biggest',
            'lowest',
            'fine',
            'date',
            'round',
        ]);
    }
}
