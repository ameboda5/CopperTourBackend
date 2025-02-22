// src/core/destinations/destinations.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';  // Asegúrate de que MongooseModule esté importado
import { DestinationsController } from 'src/infrastructure/controllers/destinations/destinations.controller';
import { DestinationsService } from './services/destinations.service';
import { Destination, DestinationSchema } from './entities/destiny.entity';
import { Country, CountrySchema } from './entities/locations/country.entity';
import { Region, RegionSchema } from './entities/locations/region.entity';
import { Department, DepartmentSchema } from './entities/locations/department.entity';
import { City, CitySchema } from './entities/locations/city.entity';
import { CountryController } from 'src/infrastructure/controllers/destinations/locations/country.controller';
import { CountryService } from './services/locations/country.service';
import { RegionController } from 'src/infrastructure/controllers/destinations/locations/region.controller';
import { RegionService } from './services/locations/region.service';
import { DepartmentController } from 'src/infrastructure/controllers/destinations/locations/departament.controller';
import { DepartmentService } from './services/locations/departament.service';
import { CityController } from 'src/infrastructure/controllers/destinations/locations/city.controller';
import { CityService } from './services/locations/city.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Destination.name, schema: DestinationSchema },
      { name: Country.name, schema: CountrySchema },  // Registro del modelo Country
      { name: Region.name, schema: RegionSchema },    // Registro del modelo Region
      { name: Department.name, schema: DepartmentSchema },  // Registro del modelo Department
      { name: City.name, schema: CitySchema },         // Registro del modelo City
    ]),
  ],
  controllers: [DestinationsController, CountryController,RegionController, DepartmentController, CityController],
  providers: [DestinationsService, CountryService, RegionService , DepartmentService , CityService],
})
export class DestinationsModule {}
