// src/core/destinations/dtos/create-destination.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDate, IsArray, IsBoolean, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

// Enum para el tipo de actividad
export enum ActivityType {
  OUTDOOR = 'Outdoor',
  INDOOR = 'Indoor',
  BOTH = 'Both',
}

// DTO para la creación de un destino
export class CreateDestinationDto {
  @IsString()
  @IsNotEmpty()
  name: string; // Nombre del destino

  @IsString()
  @IsNotEmpty()
  description: string; // Descripción del destino

  @IsString()
  @IsNotEmpty()
  country: string; // ID de país (referencia al país)

  @IsString()
  @IsNotEmpty()
  region: string; // ID de región (referencia a la región)

  @IsString()
  @IsNotEmpty()
  department: string; // ID de departamento (referencia al departamento)

  @IsString()
  @IsNotEmpty()
  city: string; // ID de ciudad (referencia a la ciudad)

  @IsString()
  @IsOptional()
  imageUrl: string; // URL de la imagen del destino

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  activities: string[]; // Actividades disponibles en el destino

  @IsNumber()
  @IsNotEmpty()
  price: number; // Precio del destino

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  categories: string[]; // Categorías del destino

  @IsString()
  @IsOptional()
  accessibility: string; // Accesibilidad del destino

  @IsArray()
  @IsEnum(ActivityType, { each: true })
  @IsOptional()
  activityTypes: ActivityType[]; // Tipo de actividades disponibles

  @IsString()
  @IsOptional()
  recommendedDuration: string; // Duración recomendada para el destino

  @IsNumber()
  @IsOptional()
  maxPersons: number; // Cantidad máxima de personas

  @IsString()
  @IsOptional()
  cancellationPolicy: string; // Política de cancelación

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  departureDate: Date; // Fecha de salida del destino

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  returnDate: Date; // Fecha de regreso del destino

  @IsString()
  @IsOptional()
  departureTime: string; // Hora de salida del destino

  @IsString()
  @IsOptional()
  status: string; // Estado del destino (activo/inactivo)

  @IsNumber()
  @IsOptional()
  minAge: number; // Edad mínima requerida

  @IsString()
  @IsOptional()
  itinerary: string; // Itinerario del destino

  @IsString()
  @IsOptional()
  transportationService: string; // Información sobre el servicio de transporte

  @IsString()
  @IsOptional()
  additionalCosts: string; // Costos adicionales

  @IsString()
  @IsOptional()
  difficultyLevel: string; // Nivel de dificultad del destino

  @IsString()
  @IsOptional()
  availabilitySeason: string; // Temporada de disponibilidad

  @IsString()
  @IsOptional()
  specialBenefits: string; // Beneficios especiales del destino

  @IsString()
  @IsOptional()
  guideInfo: string; // Información sobre el guía

  @IsString()
  @IsOptional()
  restrictions: string; // Restricciones del destino

  @IsString()
  @IsOptional()
  language: string; // Idioma del destino

  @IsBoolean()
  @IsOptional()
  petFriendly: boolean; // Si es pet-friendly
}
