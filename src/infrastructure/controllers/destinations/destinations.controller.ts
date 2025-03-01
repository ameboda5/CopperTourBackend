// src/infrastructure/controllers/destinations/destinations.controller.ts

import { Controller, Post, Body, Get, Param, Put, Delete, ConflictException, HttpException, HttpStatus, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { DestinationsService } from '../../../core/destinations/services/destinations.service';
import { Destination } from '../../../core/destinations/entities/destiny.entity';
import { CreateDestinationDto } from 'src/core/destinations/dtos/create-destiny.dto';

@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  // Crear un nuevo destino
  @Post()
  async create(@Body() createDestinationDto: CreateDestinationDto) {
    try {
      const destination = await this.destinationsService.create(createDestinationDto);
      return destination; // Respuesta exitosa con el destino creado
    } catch (error) {
      // Si es una excepción de tipo ConflictException (duplicado)
      if (error instanceof ConflictException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT); // 409 Conflict
      }
      // Si es una excepción de tipo BadRequestException (datos incompletos)
      if (error instanceof BadRequestException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST); // 400 Bad Request
      }
      // Si es una excepción de tipo InternalServerErrorException (problema con la base de datos)
      if (error instanceof InternalServerErrorException) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error
      }
      // Cualquier otro error que no se haya previsto
      throw new HttpException('Unexpected error occurred', HttpStatus.INTERNAL_SERVER_ERROR); // 500
    }
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
