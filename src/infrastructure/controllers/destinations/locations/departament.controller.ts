// src/infrastructure/controllers/locations/department.controller.ts

import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { DepartmentService } from 'src/core/destinations/services/locations/departament.service';
import { Department} from 'src/core/destinations/entities/locations/department.entity';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  // Crear un nuevo departamento
  @Post()
  async create(@Body() body: { name: string; regionId: string }): Promise<Department> {
    const { name, regionId } = body;
    return this.departmentService.create(name, regionId);
  }

  // Buscar un departamento por ID
  @Get('id/:id')
  async findById(@Param('id') id: string): Promise<Department | null> {
    return this.departmentService.findById(id);
  }

    // Buscar un departamento por nombre
    @Get('name/:name')  // Asegúrate de que la ruta sea /departments/name/:name
    async findByName(@Param('name') name: string): Promise<Department | null> {
      return this.departmentService.findByName(name);
    }

  // Buscar todos los departamentos
  @Get()
  async findAll(): Promise<Department[]> {
    return this.departmentService.findAll();
  }

  // Eliminar un departamento por ID
  @Delete('id/:id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.departmentService.remove(id);
  }
}
