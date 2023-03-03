import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRealEstateDto } from './dto/create-real-estate.dto';
import { UpdateRealEstateDto } from './dto/update-real-estate.dto';
import { RealEstate, RealEstateDocument } from './schemas/real-estate.schema';

@Injectable()
export class RealEstateService {
  constructor(
    @InjectModel(RealEstate.name)
    private readonly carModel: Model<RealEstateDocument>,
  ) {}

  async create(createRealEstateDto: CreateRealEstateDto) {
    await this.carModel.create(createRealEstateDto);
    return;
  }

  async findAll() {
    return await this.carModel.find().exec();
  }

  async findOne(id: string) {
    return await this.carModel.findById(id).exec();
  }

  async update(id: string, updateRealEstateDto: UpdateRealEstateDto) {
    return await this.carModel
      .findByIdAndUpdate(id, updateRealEstateDto)
      .exec();
  }

  async remove(id: string) {
    await this.carModel.findByIdAndUpdate(id, { inactive: true }).exec();
    return;
  }
}
