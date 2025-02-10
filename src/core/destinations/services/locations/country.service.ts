
// src/core/destinations/services/country.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountrySchema } from '../../entities/locations/country.entity'; 

@Injectable()
export class CountryService {
  constructor(@InjectModel(Country.name) private countryModel: Model<Country>) {}

    // Crea un país
  async create(createCountryDto: { name: string }): Promise<Country> {
    const newCountry = new this.countryModel(createCountryDto);
    return newCountry.save();
  }

   // Buscar Todos los paises
  async findAll(): Promise<Country[]> {
    return this.countryModel.find().exec();
  }
  
 // Buscar por ID
 async findById(id: string): Promise<Country | null> {
  return this.countryModel.findById(id).exec();
}

// Buscar por nombre
async findByName(name: string): Promise<Country | null> {
  return this.countryModel.findOne({ name }).exec();
}

 // Eliminar un país por ID
 async remove(id: string): Promise<any> {
  return this.countryModel.findByIdAndDelete(id).exec();
}

}
