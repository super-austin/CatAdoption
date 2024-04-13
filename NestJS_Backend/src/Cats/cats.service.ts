import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CatsService {
  cats = [];

  testHealth(): string {
    return 'Cats Service is working!';
  }

  getAllCats() {
    return this.cats;
  }

  createCats(name, age, color, type) {
    const existingCat = this.cats.find((cat) => cat.name === name);
    if (existingCat) {
      return {
        isSuccess: false,
        msg: 'Cat already exists!',
      };
    }
    const id = uuidv4();
    this.cats.push({ id, name, age, color, type });
    return {
      isSuccess: true,
      data: { id, name, age, color, type },
    };
  }

  getCatsById(id) {
    const existingCat = this.cats.find((cat) => cat.id === id);
    if (!existingCat) {
      return {
        isSuccess: false,
        msg: 'Cat not found!',
      };
    }
    return {
      isSuccess: true,
      data: existingCat,
    };
  }

  updateCatsById(id, cat) {
    const existingCatIndex = this.cats.findIndex((cat) => cat.id === id);

    if (existingCatIndex < 0) {
      return {
        isSuccess: false,
        msg: 'Cat not found!',
      };
    }

    const existingCat = this.cats[existingCatIndex];
    const updatedCat = { ...existingCat, ...cat };
    this.cats[existingCatIndex] = updatedCat;

    return {
      isSuccess: true,
      data: updatedCat,
    };
  }

  deleteCatsById(id) {
    const existingCatIndex = this.cats.findIndex((cat) => cat.id === id);
    if (existingCatIndex < 0) {
      return {
        isSuccess: false,
        msg: 'Cat not found!',
      };
    }

    this.cats = this.cats.filter((cat) => cat.id !== id);
    return { isSuccess: true };
  }
}
