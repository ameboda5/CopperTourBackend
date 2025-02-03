
// src/core/destinations/services/country.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountrySchema } from '../../entities/locations/country.entity'; 

@Injectable()
export class CountryService {
  constructor(@InjectModel(Country.name) private countryModel: Model<Country>) {}

  async create(createCountryDto: { name: string }): Promise<Country> {
    const newCountry = new this.countryModel(createCountryDto);
    return newCountry.save();
  }

  async findAll(): Promise<Country[]> {
    return this.countryModel.find().exec();
  }
}
