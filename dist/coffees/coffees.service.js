"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const coffee_entity_1 = require("./entities/coffee.entity");
const flavor_entity_1 = require("./entities/flavor.entity/flavor.entity");
let CoffeesService = class CoffeesService {
    constructor(coffeRepository, flavorRepository) {
        this.coffeRepository = coffeRepository;
        this.flavorRepository = flavorRepository;
    }
    findAll() {
        return this.coffeRepository.find({
            relations: {
                flavors: true,
            },
        });
    }
    async findOne(id) {
        const coffee = await this.coffeRepository.findOne({
            where: {
                id: +id
            },
            relations: {
                flavors: true
            }
        });
        if (!coffee) {
            throw new common_1.NotFoundException(`Coffee with id ${id}, not found`);
        }
        return coffee;
    }
    async create(CreateCoffeeDto) {
        const flavors = await Promise.all(CreateCoffeeDto.flavors.map(name => this.preloadFlavorsByName(name)));
        const coffee = this.coffeRepository.create(Object.assign(Object.assign({}, CreateCoffeeDto), { flavors }));
        return this.coffeRepository.save(coffee);
    }
    async update(id, UpdateCoffeeDto) {
        const flavors = UpdateCoffeeDto.flavors && (await Promise.all(UpdateCoffeeDto.flavors.map(name => this.preloadFlavorsByName(name))));
        const coffee = await this.coffeRepository.preload(Object.assign(Object.assign({ id: +id }, UpdateCoffeeDto), { flavors }));
        if (!coffee) {
            throw new common_1.NotFoundException(`Coffee ${id} not found`);
        }
        return this.coffeRepository.save(coffee);
    }
    async remove(id) {
        const coffee = await this.findOne(id);
        return this.coffeRepository.remove(coffee);
    }
    async preloadFlavorsByName(name) {
        const existingFlavor = await this.flavorRepository.findOne({
            where: { name },
        });
        if (existingFlavor) {
            return existingFlavor;
        }
        return this.flavorRepository.create({ name });
    }
};
CoffeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(coffee_entity_1.Coffee)),
    __param(1, (0, typeorm_1.InjectRepository)(flavor_entity_1.Flavor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CoffeesService);
exports.CoffeesService = CoffeesService;
//# sourceMappingURL=coffees.service.js.map