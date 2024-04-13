import { Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  userData = [];

  testHealth(): string {
    return 'User Service is working!';
  }

  async registerUser(username, password) {
    const user = this.userData.find((user) => user.username === username);
    if (user) {
      return {
        success: false,
        msg: 'User already exists!',
      };
    }
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    this.userData.push({ username, password: hashedPassword });
    return {
      success: true,
      msg: 'User Created!',
    };
  }

  async loginUser(username, password) {
    const user = this.userData.find((user) => user.username === username);
    if (!user) {
      return {
        succss: false,
        msg: 'User not found!',
      };
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return {
        success: false,
        msg: 'Invalid Password!',
      };
    }
    const jwt = await sign(
      {
        username,
        app: process.env.APP_NAME,
        expiresIn: Date.now() + 1000 * 60 * 5, // 5 mins
      },
      process.env.JWT_SECRET_KEY,
    );
    return {
      success: true,
      jwt,
    };
  }
}
