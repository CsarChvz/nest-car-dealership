import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';


@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id '${id}' not found`);

    return car;
  }

  create(createCarDto: CreateCarDto){
    const newCar = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(newCar);
    return newCar
  }

  update(id: string, updateCarDto: UpdateCarDto){
    const car = this.findOneById(id);
    const index = this.cars.findIndex((car) => car.id === id);
    this.cars[index] = {
      ...car,
      ...updateCarDto,
      id: car.id,
    };
    return this.cars[index];
  }


  delete(id: string){
    const index = this.cars.findIndex((car) => car.id === id);
    if (index === -1) throw new NotFoundException(`Car with id '${id}' not found`);
    this.cars.splice(index, 1);
    return { deleted: true };
  }
}
