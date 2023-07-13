import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
export declare class CoffeesController {
    private readonly coffeesService;
    constructor(coffeesService: CoffeesService);
    findAll(paginationQuery: any): Promise<import("./entities/coffee.entity").Coffee[]>;
    findOne(id: number): Promise<import("./entities/coffee.entity").Coffee>;
    create(body: CreateCoffeeDto): Promise<import("./entities/coffee.entity").Coffee>;
    update(id: string, body: UpdateCoffeeDto): Promise<import("./entities/coffee.entity").Coffee>;
    remove(id: string, body: any): Promise<import("./entities/coffee.entity").Coffee>;
}
