import BaseRepository from "./BaseRepository";

export default class Bet extends BaseRepository {
    table = 'Bet';
    fields = [
        'bust',
        'biggest',
        'lowest',
        'fine',
        'date',
        'round',
    ];

    constructor() {
        super(table, fields);
    }
}
