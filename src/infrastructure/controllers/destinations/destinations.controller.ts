// src/infrastructure/controllers/destinations/destinations.controller.ts

import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { DestinationsService } from '../../../core/destinations/services/destinations.service';
import { CreateDestinationDto } from '../../../core/destinations/dtos/create-destination.dto';
import { Destination } from '../../../core/destinations/entities/destiny.entity';

@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  // Crear un nuevo destino
  @Post()
  async create(@Body() createDestinationDto: CreateDestinationDto): Promise<Destination> {
    // Verificar que los ObjectIds sean válidos y existan en las colecciones correspondientes
    return this.destinationsService.create(createDestinationDto);
  }

  // Obtener todos los destinos
  @Get()
  async findAll(): Promise<Destination[]> {
    // Usamos populate para obtener los datos completos de las ubicaciones asociadas
    return this.destinationsService.findAll();
  }

  // Obtener un destino por su ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Destination> {
    // Obtener un destino específico y sus ubicaciones asociadas
    return this.destinationsService.findOne(id);
  }

  // Actualizar un destino por su ID
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDestinationDto: CreateDestinationDto
  ): Promise<Destination> {
    // Actualizar el destino y asegurarse de que las ubicaciones existan
    return this.destinationsService.update(id, updateDestinationDto);
  }

  // Eliminar un destino por su ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    // Eliminar el destino con el ID correspondiente
    return this.destinationsService.remove(id);
  }
}
