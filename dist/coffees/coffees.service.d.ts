import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity/flavor.entity';
export declare class CoffeesService {
    private readonly coffeRepository;
    private readonly flavorRepository;
    constructor(coffeRepository: Repository<Coffee>, flavorRepository: Repository<Flavor>);
    findAll(): Promise<Coffee[]>;
    findOne(id: string): Promise<Coffee>;
    create(CreateCoffeeDto: CreateCoffeeDto): Promise<Coffee>;
    update(id: string, UpdateCoffeeDto: UpdateCoffeeDto): Promise<Coffee>;
    remove(id: string): Promise<Coffee>;
    private preloadFlavorsByName;
}
