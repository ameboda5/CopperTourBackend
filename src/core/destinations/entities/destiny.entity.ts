import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

// Importamos los enums
import { ActivityType } from '../enums/destiny/activity-type.enum';
import { DestinationCategory } from '../enums/destiny/category.enum';
import { DifficultyLevel } from '../enums/destiny/difficulty-level.enum';
import { AvailabilitySeason } from '../enums/destiny/availability-season.enum';
import { Language } from '../enums/destiny/language.enum';
import { DestinationStatus } from '../enums/destiny/destination-status.enum';
import { Country } from './locations/country.entity';
import { Region } from './locations/region.entity';
import { Department } from './locations/department.entity';
import { City } from './locations/city.entity';

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

  @Prop({ type: [String], enum: DestinationCategory })
  categories: DestinationCategory[]; // Categorías del destino

  @Prop()
  accessibility: string; // Accesibilidad del destino

  @Prop({ type: [String], enum: ActivityType })
  activityTypes: ActivityType[]; // Tipo de actividades disponibles

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

  @Prop({ enum: DestinationStatus, default: DestinationStatus.ACTIVE })
  status: DestinationStatus; // Estado del destino (activo/inactivo)

  @Prop()
  minAge: number; // Edad mínima requerida

  @Prop()
  itinerary: string; // Itinerario del destino

  @Prop()
  transportationService: string; // Servicio de transporte disponible

  @Prop()
  additionalCosts: string; // Costos adicionales

  @Prop({ enum: DifficultyLevel })
  difficultyLevel: DifficultyLevel; // Nivel de dificultad

  @Prop({ enum: AvailabilitySeason })
  availabilitySeason: AvailabilitySeason; // Temporada de disponibilidad

  @Prop()
  specialBenefits: string; // Beneficios especiales

  @Prop()
  guideInfo: string; // Información sobre el guía

  @Prop()
  restrictions: string; // Restricciones del destino

  @Prop({ enum: Language })
  language: Language; // Idioma en el que se ofrece el destino

  @Prop()
  petFriendly: boolean; // Si el destino es pet-friendly
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);
