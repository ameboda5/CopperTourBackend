// src/core/destinations/services/destinations.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';  // Importamos Types desde mongoose
import { Destination } from '../entities/destiny.entity';
import { CreateDestinationDto } from '../dtos/create-destination.dto';
import { Country } from '../entities/locations/country.entity';
import { Region } from '../entities/locations/region.entity';
import { Department } from '../entities/locations/department.entity';
import { City } from '../entities/locations/city.entity';

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

  // Crear un nuevo destino
  async create(createDestinationDto: CreateDestinationDto): Promise<Destination> {
    const { country, region, department, city } = createDestinationDto;

    // Verifica que las referencias sean válidas
    await this.validateLocationReferences(country, region, department, city);

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
