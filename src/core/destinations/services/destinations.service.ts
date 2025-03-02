// src/core/destinations/services/destinations.service.ts
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';  // Importamos Types desde mongoose
import { Destination } from '../entities/destiny.entity';
import { CreateDestinationDto } from '../dtos/create-destiny.dto';
import { Country } from '../entities/locations/country.entity';
import { Region } from '../entities/locations/region.entity';
import { Department } from '../entities/locations/department.entity';
import { City } from '../entities/locations/city.entity';
import { DestinationCategory } from '../enums/destiny/category.enum';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectModel(Destination.name) private destinationModel: Model<Destination>,
    @InjectModel(Country.name) private countryModel: Model<Country>,
    @InjectModel(Region.name) private regionModel: Model<Region>,
    @InjectModel(Department.name) private departmentModel: Model<Department>,
    @InjectModel(City.name) private cityModel: Model<City>,
  ) {}

  // Verifica si las referencias (ObjectIds) a las ubicaciones son válidas
  private async validateLocationReferences(country: Types.ObjectId, region?: Types.ObjectId, department?: Types.ObjectId, city?: Types.ObjectId): Promise<boolean> {
    // Verifica que el país sea un ObjectId válido
    if (!Types.ObjectId.isValid(country)) {
      throw new Error('Invalid country ObjectId');
    }

    const countryExists = await this.countryModel.findById(country);
    if (!countryExists) {
      throw new Error('Country not found');
    }

    // Verifica que la región exista, si se proporcionó
    if (region && !Types.ObjectId.isValid(region)) {
      throw new Error('Invalid region ObjectId');
    }

    const regionExists = region ? await this.regionModel.findById(region) : null;
    if (region && !regionExists) {
      throw new Error('Region not found');
    }

    // Verifica que el departamento exista, si se proporcionó
    if (department && !Types.ObjectId.isValid(department)) {
      throw new Error('Invalid department ObjectId');
    }

    const departmentExists = department ? await this.departmentModel.findById(department) : null;
    if (department && !departmentExists) {
      throw new Error('Department not found');
    }

    // Verifica que la ciudad exista, si se proporcionó
    if (city && !Types.ObjectId.isValid(city)) {
      throw new Error('Invalid city ObjectId');
    }

    const cityExists = city ? await this.cityModel.findById(city) : null;
    if (city && !cityExists) {
      throw new Error('City not found');
    }

    return true;
  }

  // verifica si el nombre o destino tiene el mismo nombre o esta en el mismo lugar
  private async checkDuplicateDestination(createDestinationDto: CreateDestinationDto): Promise<void> {
    const { name, country, region, department, city } = createDestinationDto;
  
    const existingDestination = await this.destinationModel.findOne({
      name,
      country,
      region,
      department,
      city,
    });
  
    if (existingDestination) {
      throw new  ConflictException('Destination with the same name already exists in this location');
    }
  }


  private validateDates(departureDate: Date, returnDate: Date): void {
    if (returnDate && returnDate < departureDate) {
      throw new BadRequestException('Return date cannot be earlier than departure date');
    }
  }

  private validatePrice(price: number): void {
    if (price <= 0) {
      throw new BadRequestException('Price must be greater than zero');
    }
  }

  private validateCategory(categories: DestinationCategory[]): void {
    // Validamos que cada categoría en el arreglo sea una categoría válida
    categories.forEach(category => {
      if (!Object.values(DestinationCategory).includes(category)) {
        throw new BadRequestException(`Invalid category: ${category}`);
      }
    });
  }

  private validateAgeRestrictions(minAge: number, categories: DestinationCategory[]): void {
    // Validación de edades generales
    if (minAge < 0) {
      throw new BadRequestException('Age cannot be negative');
    }

  
    // Mapa de categorías con sus restricciones de edad
    const ageRestrictions = {
      [DestinationCategory.ADVENTURE]: { min: 18},
      [DestinationCategory.CULTURAL]: { min: 10},
      [DestinationCategory.BEACH]: { min: 0},
      [DestinationCategory.MOUNTAIN]: { min: 12},
      [DestinationCategory.HISTORICAL]: { min: 12},
      [DestinationCategory.NATURE]: { min: 12},
      [DestinationCategory.URBAN]: { min: 12},
      [DestinationCategory.FAMILY]: { min: 0},
      [DestinationCategory.LUXURY]: { min: 18},
      [DestinationCategory.ROMANTIC]: { min: 18},
      [DestinationCategory.MOTORCYCLES]: { min: 18},
      [DestinationCategory.CHARITY]: { min: 10},
      [DestinationCategory.GASTRONOMIC]: { min: 10},
      [DestinationCategory.City]: { min: 18},
    };
  
    // Validación por cada categoría
    categories.forEach(category => {
      const { min } = ageRestrictions[category] || { min: 0 };
  
      if (minAge < min) {
        throw new BadRequestException(`${category} destinations are for ages between ${min}`);
      }
    });
  }

  private validateDuration(duration: string): void {
    const validDurationRegex = /^\d+\s(hours|days|weeks|months)$/;
    if (!validDurationRegex.test(duration)) {
      throw new BadRequestException('Invalid duration format. Example: "3 days", "2 weeks"');
    }
  }

  private validateAccessibility(accessibility: string): void {
    if (accessibility && accessibility.length < 10) {
      throw new BadRequestException('Accessibility information must be at least 10 characters long');
    }
  }

  private validateLanguage(language: string): void {
    const validLanguages = ['English', 'Spanish', 'French', 'German'];
    if (!validLanguages.includes(language)) {
      throw new BadRequestException('Invalid language for the destination');
    }
  }

  private validateStatus(status: string): void {
    if (status === 'inactive') {
      throw new BadRequestException('Destination cannot be created as inactive');
    }
  }
  

  // Crear un nuevo destino
  async create(createDestinationDto: CreateDestinationDto): Promise<Destination> {
    const { country, region, department, city, minAge, categories } = createDestinationDto;

    // Verifica que las referencias sean válidas
    await this.validateLocationReferences(country, region, department, city);
    await this.checkDuplicateDestination(createDestinationDto);
    this.validateDates(createDestinationDto.departureDate, createDestinationDto.returnDate);
    this.validatePrice(createDestinationDto.price)
    this.validateCategory(createDestinationDto.categories);
    this.validateAgeRestrictions(minAge, categories);  // Ahora pasas el arreglo de categorías
    this.validateDuration(createDestinationDto.recommendedDuration);  
    this.validateAccessibility(createDestinationDto.accessibility); 
    this.validateLanguage(createDestinationDto.language); 
    this.validateStatus(createDestinationDto.status); 

    const createdDestination = new this.destinationModel(createDestinationDto);
    return createdDestination.save();
  }

  // Obtener todos los destinos
  async findAll(): Promise<Destination[]> {
    return this.destinationModel
      .find()
      .populate('country')  // Poblar las referencias a países
      .populate('region')   // Poblar las referencias a regiones
      .populate('department')  // Poblar las referencias a departamentos
      .populate('city')  // Poblar las referencias a ciudades
      .exec();
  }

  // Obtener un destino por su ID
  async findOne(id: string): Promise<Destination> {
    return this.destinationModel
      .findById(id)
      .populate('country')
      .populate('region')
      .populate('department')
      .populate('city')
      .exec();
  }

  // Actualizar un destino por su ID
    async update(id: string, updateDestinationDto: CreateDestinationDto): Promise<Destination> {
    const { country, region, department, city } = updateDestinationDto;

    // Verifica que las referencias sean válidas antes de actualizar
    await this.validateLocationReferences(country, region, department, city);

    return this.destinationModel.findByIdAndUpdate(id, updateDestinationDto, { new: true }).exec();
  }

  // Eliminar un destino por su ID
  async remove(id: string): Promise<void> {
    await this.destinationModel.findByIdAndDelete(id).exec();
  }
}
