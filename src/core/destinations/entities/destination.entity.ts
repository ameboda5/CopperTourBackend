// src/core/destinations/entities/destination.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';  // Importamos Types desde mongoose

@Schema()
export class Destination extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  country: Types.ObjectId;  // Usamos Types.ObjectId

  @Prop({ type: Types.ObjectId })
  region?: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  department?: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  city?: Types.ObjectId;

  @Prop({ default: 'country' })
  divisionType: 'country' | 'region' | 'department' | 'city';
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);
