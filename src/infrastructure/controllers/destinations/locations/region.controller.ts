
// src/infrastructure/controllers/locations/region.controller.ts

import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { RegionService } from 'src/core/destinations/services/locations/region.service';
import { Region } from 'src/core/destinations/entities/locations/region.entity';

@Controller('regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  // Crear una nueva región
  @Post()
  async create(@Body() body: { name: string; countryId: string }): Promise<Region> {
    const { name, countryId } = body;
    return this.regionService.create(name, countryId);
  }

    // Buscar todas las regiones
    @Get()
    async findAll(): Promise<Region[]> {
      return this.regionService.findAll();
    }

  // Buscar una región por ID
  @Get('id/:id')
  async findById(@Param('id') id: string): Promise<Region | null> {
    return this.regionService.findById(id);
  }

  // Buscar una región por nombre
  @Get('name/:name')
  async findByName(@Param('name') name: string): Promise<Region | null> {
    return this.regionService.findByName(name);
  }

  // Eliminar una región por ID
  @Delete('id/:id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.regionService.remove(id);
  }
}
