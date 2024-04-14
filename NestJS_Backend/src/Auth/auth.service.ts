import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { genSalt, hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { JWTPayloadDto } from './auth.dto';
import * as UserContractInfo from '../Contract/User.json';
import { environmentVariables, errorMsgs } from '../common.const';

@Injectable()
export class AuthService {
  userData = [];
  web3: Web3;
  userContractAddress = UserContractInfo.networks['5777'].address;
  userContractABI = UserContractInfo.abi;

  constructor() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(environmentVariables.PROVIDER_URL),
    );
  }

  testHealth(): string {
    return errorMsgs.UserHealthCheck;
  }

  async registerUser(username, password) {
    const userContract = new this.web3.eth.Contract(
      this.userContractABI,
      this.userContractAddress,
    );
    try {
      await userContract.methods.findUserByUsername(username).call();
      return {
        success: false,
        msg: errorMsgs.UserAlreadyExists,
      };
    } catch (error) {
      // If user is not existing
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);
      await userContract.methods
        .registerUser(username, hashedPassword)
        .send({ from: environmentVariables.ACCOUNT_ADDRESS, gas: '1000000' });
      return {
        success: true,
        msg: errorMsgs.UserCreated,
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
          msg: errorMsgs.InvalidPassword,
        };
      }
      const jwt = await sign(
        {
          username,
          app: environmentVariables.APP_NAME,
          expiresIn: Date.now() + 1000 * 60 * 5, // 5 mins
        },
        environmentVariables.JWT_SECRET_KEY,
      );
      return {
        success: true,
        jwt,
      };
    } catch (err) {
      return { success: false, msg: errorMsgs.UserNotFound };
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

      if (app !== environmentVariables.APP_NAME) return false;

      if (Date.now() > expiresIn) return false;

      return true;
    } catch (error) {
      // If user does not exist
      return false;
    }
  }
}
