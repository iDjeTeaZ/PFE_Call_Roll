import { UserLastnamePipe } from './user-lastname.pipe';

describe('UserLastnamePipe', () => {
  it('create an instance', () => {
    const pipe = new UserLastnamePipe();
    expect(pipe).toBeTruthy();
  });
});
