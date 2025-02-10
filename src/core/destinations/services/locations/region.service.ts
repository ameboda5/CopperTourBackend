// src/core/destinations/services/region.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from '../../entities/locations/country.entity';
import { Region } from '../../entities/locations/region.entity';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region.name) private regionModel: Model<Region>,
    @InjectModel(Country.name) private countryModel: Model<Country>
  ) {}

  // Crear una nueva región
  async create(name: string, countryId: string): Promise<Region> {
    // Verificar si el país existe
    const country = await this.countryModel.findById(countryId);
    if (!country) {
      throw new Error('Country not found');
    }

    
    // Crear la nueva región
    const region = new this.regionModel({ name, country: countryId });
    return region.save();
  }

   // Método para buscar todas las regiones
   async findAll(): Promise<Region[]> {
    return this.regionModel.find().populate('country').exec();
  }

  // Buscar una región por ID
  async findById(id: string): Promise<Region | null> {
    return this.regionModel.findById(id).populate('country').exec();  // Poblar el país
  }

  // Buscar una región por nombre
  async findByName(name: string): Promise<Region | null> {
    return this.regionModel.findOne({ name }).populate('country').exec();  // Poblar el país
  }

  // Eliminar una región por ID
  async remove(id: string): Promise<any> {
    return this.regionModel.findByIdAndDelete(id).exec();
  }
}
