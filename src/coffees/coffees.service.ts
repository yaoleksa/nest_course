import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [{
        id: 1,
        name: 'Lavatzza',
        brand: 'Java',
        flavors: ['fresh', 'bitter']
    }];

    findAll(){
        return this.coffees
    }

    findOne(id: string) {
        const coffee = this.coffees.find(item => item.id === +id);
        if(!coffee) {
            throw new NotFoundException(`Coffee with id ${id}, not found`);
        }
        return coffee;
    }

    create(CreateCoffeeDto: any) {
        this.coffees.push(CreateCoffeeDto);
        return CreateCoffeeDto;
    }

    update(id: string, UpdateCoffeeDto: any) {
        const existingCoffee = this.findOne(id);
        if(existingCoffee) {
            // update
        }
    }

    remove(id: string) {
        const coffeIndex = this.coffees.findIndex(item => item.id === +id);
        if(coffeIndex >= 0) {
            this.coffees.splice(coffeIndex, 1);
        }
    }

}
