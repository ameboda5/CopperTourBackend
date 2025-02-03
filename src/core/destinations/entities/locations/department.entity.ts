// src/core/destinations/entities/department.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Region } from './region.entity'; // Referencia a la región

@Schema()
export class Department extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Region' })
  region: Region;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
