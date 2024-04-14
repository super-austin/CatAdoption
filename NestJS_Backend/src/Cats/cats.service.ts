import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import Web3 from 'web3';

import * as CatContractInfo from '../Contract/Cat.json';

@Injectable()
export class CatsService {
  cats = [];
  web3: Web3;
  catContractAddress = CatContractInfo.networks['5777'].address;
  catContractABI = CatContractInfo.abi;

  constructor() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.PROVIDER_URL),
    );
  }

  testHealth(): string {
    return 'Cats Service is working!';
  }

  getAllCats() {
    return this.cats;
  }

  async createCats(name, age, color, type) {
    const catContract = new this.web3.eth.Contract(
      this.catContractABI,
      this.catContractAddress,
    );
    try {
      const id = uuidv4();
      await catContract.methods
        .createCat(id, name, color, type, age)
        .send({ from: process.env.ACCOUNT_ADDRESS, gas: '1000000' });
      return {
        isSuccess: true,
        data: { id, name, age, color, type },
      };
    } catch (error) {
      console.error(error);
      return { isSuccess: false };
    }
  }

  async getCatsById(id) {
    const catContract = new this.web3.eth.Contract(
      this.catContractABI,
      this.catContractAddress,
    );
    try {
      const existingCat = await catContract.methods.findCatById(id).call();
      return {
        isSuccess: true,
        data: {
          id: existingCat[0],
          name: existingCat[1],
          color: existingCat[2],
          type: existingCat[3],
          age: Number(existingCat[4]),
        },
      };
    } catch (error) {
      return {
        isSuccess: false,
        msg: 'Cat not found!',
      };
    }
  }

  async updateCatsById(id, cat) {
    const catContract = new this.web3.eth.Contract(
      this.catContractABI,
      this.catContractAddress,
    );
    try {
      const existingCat = await catContract.methods.findCatById(id).call();

      const updatedCat = {
        id: existingCat[0],
        name: existingCat[1],
        color: existingCat[2],
        type: existingCat[3],
        age: Number(existingCat[4]),

        ...cat,
      };

      await catContract.methods.updateCat(
        id,
        updatedCat.name,
        updatedCat.color,
        updatedCat.type,
        Number(updatedCat.age),
      );

      return {
        isSuccess: true,
        data: updatedCat,
      };
    } catch (err) {
      return {
        isSuccess: false,
        msg: 'Cat not found!',
      };
    }
  }

  async deleteCatsById(id) {
    const catContract = new this.web3.eth.Contract(
      this.catContractABI,
      this.catContractAddress,
    );

    try {
      await catContract.methods.findCatById(id).call();

      await catContract.methods
        .deleteCat(id)
        .send({ from: process.env.ACCOUNT_ADDRESS, gas: '1000000' });
      return { isSuccess: true };
    } catch (err) {
      return {
        isSuccess: false,
        msg: 'Cat not found!',
      };
    }
  }
}
