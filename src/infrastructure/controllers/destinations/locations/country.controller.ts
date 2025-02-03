// src/infrastructure/controllers/locations/country.controller.ts

import { Controller, Post, Body, Get } from '@nestjs/common';
import { CountryService } from 'src/core/destinations/services/locations/country.service';
import { Country, CountrySchema } from 'src/core/destinations/entities/locations/country.entity';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  create(@Body() createCountryDto: { name: string }): Promise<Country> {
    return this.countryService.create(createCountryDto);
  }

  @Get()
  findAll(): Promise<Country[]> {
    return this.countryService.findAll();
  }
}
