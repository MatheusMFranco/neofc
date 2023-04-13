import Connection from './connection';

describe('Database', () => {
    it('should open the connection', () => {
        expect(Connection).toBeDefined();
    });
});