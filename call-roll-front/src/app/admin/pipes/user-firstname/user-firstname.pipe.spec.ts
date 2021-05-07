import { UserFirstnamePipe } from './user-firstname.pipe';

describe('UserFirstnamePipe', () => {
  it('create an instance', () => {
    const pipe = new UserFirstnamePipe();
    expect(pipe).toBeTruthy();
  });
});
