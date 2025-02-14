// src/infrastructure/controllers/locations/city.controller.ts

import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { CityService } from 'src/core/destinations/services/locations/city.service';
import { City } from 'src/core/destinations/entities/locations/city.entity';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  // Crear una nueva ciudad
  @Post()
  async create(@Body() body: { name: string; departmentId: string }): Promise<City> {
    const { name, departmentId } = body;
    return this.cityService.create(name, departmentId);
  }

  // Buscar una ciudad por ID
  @Get('id/:id')
  async findById(@Param('id') id: string): Promise<City | null> {
    return this.cityService.findById(id);
  }

  // Buscar una ciudad por nombre
  @Get('name/:name')
  async findByName(@Param('name') name: string): Promise<City | null> {
    return this.cityService.findByName(name);
  }

  // Buscar todas las ciudades
  @Get()
  async findAll(): Promise<City[]> {
    return this.cityService.findAll();
  }

  // Eliminar una ciudad por ID
  @Delete('id/:id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.cityService.remove(id);
  }
}
