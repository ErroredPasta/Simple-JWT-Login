import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { encrypt } from './encryption';

@Injectable()
export class AuthService {

  private inMemoryUsers: User[] = [];

  constructor(private jwtService: JwtService) {}

  async signUp(id: string, pw: string): Promise<void> {
    if (this.doesIdExist(id)) {
      throw new ConflictException('ID already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(pw, salt);

    const newUser = new User(id, hashedPassword);

    this.inMemoryUsers.push(newUser);
  }

  async signIn(id: string, pw: string): Promise<{ token: string }> {
    const user = this.inMemoryUsers.find((user) => user.id === id);

    if (user && (await bcrypt.compare(pw, user.pw))) {
      const token = await this.jwtService.signAsync({ id });
      return { token }
    }

    throw new UnauthorizedException('Check your ID and password again');
  }

  async secureSignIn(id: string, pw: string, publicKey: string): Promise<{ token: string; }> {
    const plainToken = (await this.signIn(id, pw)).token;
    const encryptToken = encrypt(plainToken, publicKey);

    return { token: encryptToken }
  }

  private doesIdExist(id: string): boolean {
    return this.inMemoryUsers.filter((user) => user.id === id).length !== 0;
  }
}
