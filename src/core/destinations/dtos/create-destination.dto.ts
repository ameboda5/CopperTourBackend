// src/core/destinations/dtos/create-destination.dto.ts

import { IsMongoId, IsOptional } from 'class-validator';
import { Types } from 'mongoose';  // Importamos Types de mongoose

export class CreateDestinationDto {
  @IsMongoId()
  country: Types.ObjectId;  // Usamos Types.ObjectId en lugar de string

  @IsOptional()
  @IsMongoId()
  region?: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  department?: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  city?: Types.ObjectId;

  @IsOptional()
  divisionType: 'country' | 'region' | 'department' | 'city';
}

