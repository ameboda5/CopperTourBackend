// src/core/destinations/entities/region.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Country } from './country.entity'; // Referencia al país

@Schema()
export class Region extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Country' })
  country: Country;
}

export const RegionSchema = SchemaFactory.createForClass(Region);
