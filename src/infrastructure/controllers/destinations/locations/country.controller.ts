// src/infrastructure/controllers/locations/country.controller.ts

import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CountryService } from 'src/core/destinations/services/locations/country.service';
import { Country, CountrySchema } from 'src/core/destinations/entities/locations/country.entity';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  // Crea un país
  @Post()
  create(@Body() createCountryDto: { name: string }): Promise<Country> {
    return this.countryService.create(createCountryDto);
  }

 // Buscar Todos los paises
  @Get()
  findAll(): Promise<Country[]> {
    return this.countryService.findAll();
  }

 // Buscar un país por ID
 @Get('id/:id')
 async findById(@Param('id') id: string): Promise<Country | null> {
   return this.countryService.findById(id);
 }

 // Buscar un país por nombre
 @Get('name/:name')
 async findByName(@Param('name') name: string): Promise<Country | null> {
   return this.countryService.findByName(name);
 }

  // Eliminar un país por ID
  @Delete('id/:id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.countryService.remove(id);
  }


}
