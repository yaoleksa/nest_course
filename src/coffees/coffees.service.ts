import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity/flavor.entity';

@Injectable()
export class CoffeesService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeRepository: Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>
    ) {}

    findAll(){
        return this.coffeRepository.find({
            relations: {
                flavors: true,
            },
        });
    }

    async findOne(id: string) {
        const coffee = await this.coffeRepository.findOne({ 
            where: { 
                id: +id 
            },
            relations: {
                flavors: true
            }
        });
        if(!coffee) {
            throw new NotFoundException(`Coffee with id ${id}, not found`);
        }
        return coffee;
    }

    async create(CreateCoffeeDto: CreateCoffeeDto) {
        const flavors = await Promise.all(
            CreateCoffeeDto.flavors.map(name => this.preloadFlavorsByName(name))
        );
        const coffee = this.coffeRepository.create({
            ...CreateCoffeeDto,
            flavors
        });
        return this.coffeRepository.save(coffee);
    }

    async update(id: string, UpdateCoffeeDto: UpdateCoffeeDto) {
        const flavors = UpdateCoffeeDto.flavors && (
            await Promise.all(
                UpdateCoffeeDto.flavors.map(name => this.preloadFlavorsByName(name))
            )
        );
        const coffee = await this.coffeRepository.preload(
            {
                id: +id,
                ...UpdateCoffeeDto,
                flavors
            }
        );
        if(!coffee) {
            throw new NotFoundException(`Coffee ${id} not found`);
        }
        return this.coffeRepository.save(coffee);
    }

    async remove(id: string) {
        const coffee = await this.findOne(id);
        return this.coffeRepository.remove(coffee);
    }

    private async preloadFlavorsByName(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepository.findOne({
            where: { name },
        });
        if(existingFlavor) {
            return existingFlavor;
        }
        return this.flavorRepository.create({ name });
    }
}
