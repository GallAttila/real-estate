import { Module } from '@nestjs/common';
import { RealEstateService } from './real-estate.service';
import { RealEstateController } from './real-estate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RealEstate, RealEstateSchema } from './schemas/real-estate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RealEstate.name, schema: RealEstateSchema },
    ]),
  ],
  controllers: [RealEstateController],
  providers: [RealEstateService],
})
export class RealEstateModule {}
