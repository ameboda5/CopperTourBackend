// src/core/destinations/services/department.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department } from '../../entities/locations/department.entity';
import { Region } from '../../entities/locations/region.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name) private departmentModel: Model<Department>,
    @InjectModel(Region.name) private regionModel: Model<Region>
  ) {}

  // Crear un nuevo departamento
  async create(name: string, regionId: string): Promise<Department> {
    // Verificar si la región existe
    const region = await this.regionModel.findById(regionId);
    if (!region) {
      throw new Error('Region not found');
    }

    // Crear el departamento
    const department = new this.departmentModel({ name, region: regionId });
    return department.save();
  }

  // Buscar un departamento por ID
  async findById(id: string): Promise<Department | null> {
    return this.departmentModel.findById(id).populate('region').exec();  // Poblar la región
  }

  // Buscar un departamento por nombre
  async findByName(name: string): Promise<Department | null> {
    return this.departmentModel.findOne({ name }).populate('region').exec();  // Poblar la región
  }

  // Buscar todos los departamentos
  async findAll(): Promise<Department[]> {
    return this.departmentModel.find().populate('region').exec();  // Poblar la región
  }

  // Eliminar un departamento por ID
  async remove(id: string): Promise<any> {
    return this.departmentModel.findByIdAndDelete(id).exec();
  }
}
