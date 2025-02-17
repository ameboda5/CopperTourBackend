// src/core/destinations/entities/destination.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Country } from './locations/country.entity';  // Relación con Country
import { Region } from './locations/region.entity';    // Relación con Region
import { Department } from './locations/department.entity'; // Relación con Department
import { City } from './locations/city.entity';          // Relación con City

@Schema()
export class Destination extends Document {
  @Prop({ required: true })
  name: string; // Nombre del destino

  @Prop({ required: true })
  description: string; // Descripción del destino

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true })
  country: Country; // Relación con el país

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Region', required: true })
  region: Region; // Relación con la región

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true })
  department: Department; // Relación con el departamento

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true })
  city: City; // Relación con la ciudad

  @Prop()
  imageUrl: string; // URL de la imagen

  @Prop([String])
  activities: string[]; // Actividades disponibles

  @Prop({ required: true })
  price: number; // Precio del destino

  @Prop([String])
  categories: string[]; // Categorías del destino

  @Prop()
  accessibility: string; // Accesibilidad del destino

  @Prop([String])
  activityTypes: string[]; // Tipo de actividades disponibles

  @Prop()
  recommendedDuration: string; // Duración recomendada para el destino

  @Prop()
  maxPersons: number; // Cantidad máxima de personas

  @Prop()
  cancellationPolicy: string; // Política de cancelación

  @Prop()
  departureDate: Date; // Fecha de salida del destino

  @Prop()
  returnDate: Date; // Fecha de regreso del destino

  @Prop()
  departureTime: string; // Hora de salida

  @Prop()
  status: string; // Estado del destino (activo/inactivo)

  @Prop()
  minAge: number; // Edad mínima requerida

  @Prop()
  itinerary: string; // Itinerario del destino

  @Prop()
  transportationService: string; // Servicio de transporte disponible

  @Prop()
  additionalCosts: string; // Costos adicionales

  @Prop()
  difficultyLevel: string; // Nivel de dificultad

  @Prop()
  availabilitySeason: string; // Temporada de disponibilidad

  @Prop()
  specialBenefits: string; // Beneficios especiales

  @Prop()
  guideInfo: string; // Información sobre el guía

  @Prop()
  restrictions: string; // Restricciones del destino

  @Prop()
  language: string; // Idioma en el que se ofrece el destino

  @Prop()
  petFriendly: boolean; // Si el destino es pet-friendly
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);

