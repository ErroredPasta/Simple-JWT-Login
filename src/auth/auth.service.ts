import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private inMemoryUsers: User[] = [];

  async signUp(id: string, pw: string): Promise<void> {
    if (this.doesIdExist(id)) {
      throw new ConflictException('ID already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(pw, salt);

    const newUser = new User(id, hashedPassword);

    this.inMemoryUsers.push(newUser);
  }

  private doesIdExist(id: string): boolean {
    return this.inMemoryUsers.filter((user) => user.id === id).length !== 0;
  }
}
