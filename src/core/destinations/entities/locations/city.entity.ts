// src/core/destinations/entities/city.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Department } from './department.entity'; // Referencia al departamento

@Schema()
export class City extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Department' })
  department: Department;
}

export const CitySchema = SchemaFactory.createForClass(City);
