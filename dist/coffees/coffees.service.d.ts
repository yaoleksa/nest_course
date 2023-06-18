import { Coffee } from './entities/coffee.entity';
export declare class CoffeesService {
    private coffees;
    findAll(): Coffee[];
    findOne(id: string): Coffee;
    create(CreateCoffeeDto: any): any;
    update(id: string, UpdateCoffeeDto: any): void;
    remove(id: string): void;
}
