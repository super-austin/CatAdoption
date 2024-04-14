import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { genSalt, hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { JWTPayloadDto } from './auth.dto';
import * as UserContractInfo from '../Contract/User.json';

@Injectable()
export class AuthService {
  userData = [];
  web3: Web3;
  userContractAddress = UserContractInfo.networks['5777'].address;
  userContractABI = UserContractInfo.abi;

  constructor() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.PROVIDER_URL),
    );
  }

  testHealth(): string {
    return 'User Service is working!';
  }

  async registerUser(username, password) {
    const userContract = new this.web3.eth.Contract(
      this.userContractABI,
      this.userContractAddress,
    );
    try {
      const user = await userContract.methods
        .findUserByUsername(username)
        .call();
      return {
        success: false,
        msg: 'User already exist',
      };
    } catch (error) {
      // If user is not existing
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);
      await userContract.methods
        .registerUser(username, hashedPassword)
        .send({ from: process.env.ACCOUNT_ADDRESS, gas: '1000000' });
      return {
        success: true,
        msg: 'User Created!',
      };
    }
  }

  async loginUser(username, password) {
    try {
      const userContract = new this.web3.eth.Contract(
        this.userContractABI,
        this.userContractAddress,
      );
      const user = await userContract.methods
        .findUserByUsername(username)
        .call();
      const passwordMatch = await compare(password, user[1]);
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
    } catch (err) {
      return { success: false, msg: 'User not found information' };
    }
  }

  async validateUser({
    username,
    app,
    expiresIn,
  }: JWTPayloadDto): Promise<any> {
    const userContract = new this.web3.eth.Contract(
      this.userContractABI,
      this.userContractAddress,
    );
    try {
      const user = await userContract.methods
        .findUserByUsername(username)
        .call();

      if (app !== process.env.APP_NAME) return false;

      if (Date.now() > expiresIn) return false;

      return true;
    } catch (error) {
      // If user does not exist
      return false;
    }
  }
}
