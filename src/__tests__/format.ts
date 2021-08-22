import { formatTime } from '../utils/format';

describe('add tests', () => {
  it('should return 3', () => {
    expect(formatTime(60)).toBe('00:01:00');
  });
});
