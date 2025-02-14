// src/core/destinations/services/city.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City } from '../../entities/locations/city.entity';
import { Department } from '../../entities/locations/department.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectModel(City.name) private cityModel: Model<City>,
    @InjectModel(Department.name) private departmentModel: Model<Department>
  ) {}

  // Crear una nueva ciudad
  async create(name: string, departmentId: string): Promise<City> {
    // Verificar si el departamento existe
    const department = await this.departmentModel.findById(departmentId);
    if (!department) {
      throw new Error('Department not found');
    }

    // Crear la ciudad
    const city = new this.cityModel({ name, department: departmentId });
    return city.save();
  }

  // Buscar una ciudad por ID
  async findById(id: string): Promise<City | null> {
    return this.cityModel.findById(id).populate('department').exec();  // Poblar el departamento
  }

  // Buscar una ciudad por nombre
  async findByName(name: string): Promise<City | null> {
    return this.cityModel.findOne({ name }).populate('department').exec();  // Poblar el departamento
  }

  // Buscar todas las ciudades
  async findAll(): Promise<City[]> {
    return this.cityModel.find().populate('department').exec();  // Poblar el departamento
  }

  // Eliminar una ciudad por ID
  async remove(id: string): Promise<any> {
    return this.cityModel.findByIdAndDelete(id).exec();
  }
}
