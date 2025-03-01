import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDate, IsArray, IsBoolean, IsEnum, IsUrl, Min, Max, Length } from 'class-validator';
import { Type } from 'class-transformer';

// Importamos los enums
import { ActivityType } from '../enums/destiny/activity-type.enum'; 
import { DestinationCategory } from '../enums/destiny/category.enum'; 
import { DifficultyLevel } from '../enums/destiny/difficulty-level.enum'; 
import { AvailabilitySeason } from '../enums/destiny/availability-season.enum';
import { Language } from '../enums/destiny/language.enum';
import { DestinationStatus } from '../enums/destiny/destination-status.enum';
import { Types } from 'mongoose';

export class CreateDestinationDto {
  @IsString()
  @IsNotEmpty()
  name: string; // Nombre del destino

  @IsString()
  @IsNotEmpty()
  @Length(10, 500)
  description: string; // Descripción del destino

  @IsString()
  @IsNotEmpty()
  country:  Types.ObjectId; // ID de país (referencia al país)

  @IsString()
  @IsNotEmpty()
  region:  Types.ObjectId; // ID de región (referencia a la región)

  @IsString()
  @IsNotEmpty()
  department:  Types.ObjectId; // ID de departamento (referencia al departamento)

  @IsString()
  @IsNotEmpty()
  city:  Types.ObjectId; // ID de ciudad (referencia a la ciudad)

  @IsString()
  @IsOptional()
  @IsUrl()
  imageUrl: string; // URL de la imagen del destino

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  activities: string[]; // Actividades disponibles en el destino

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  price: number; // Precio del destino

  @IsArray()
  @IsEnum(DestinationCategory, { each: true })
  @IsOptional()
  categories: DestinationCategory[]; // Categorías del destino

  @IsString()
  @IsOptional()
  accessibility: string; // Accesibilidad del destino

  @IsArray()
  @IsEnum(ActivityType, { each: true })
  @IsOptional()
  activityTypes: ActivityType[]; // Tipo de actividades disponibles

  @IsString()
  @IsOptional()
  @Length(5,500)
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

  @IsEnum(DestinationStatus)
  @IsOptional()
  status: DestinationStatus; // Estado del destino (activo/inactivo)

  @IsNumber()
  @Min(1)
  @Max(120)
  @IsOptional()
  minAge: number; // Edad mínima requerida

  @IsString()
  @IsOptional()
  @Length(10, 1000)
  itinerary: string; // Itinerario del destino

  @IsString()
  @IsOptional()
  @Length(10, 500)
  transportationService: string; // Información sobre el servicio de transporte

  @IsString()
  @IsOptional()
  additionalCosts: string; // Costos adicionales

  @IsEnum(DifficultyLevel)
  @IsOptional()
  difficultyLevel: DifficultyLevel; // Nivel de dificultad del destino

  @IsEnum(AvailabilitySeason)
  @IsOptional()
  availabilitySeason: AvailabilitySeason; // Temporada de disponibilidad

  @IsString()
  @IsOptional()
  @Length(10, 500)
  specialBenefits: string; // Beneficios especiales del destino

  @IsString()
  @IsOptional()
  @Length(10, 800)
  guideInfo: string; // Información sobre el guía

  @IsString()
  @IsOptional()
  @Length(10,800)
  restrictions: string; // Restricciones del destino

  @IsEnum(Language)
  @IsOptional()
  language: Language; // Idioma del destino

  @IsBoolean()
  @IsOptional()
  petFriendly: boolean; // Si es pet-friendly
}
