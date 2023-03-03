import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { HydratedDocument } from 'mongoose';

export type RealEstateDocument = HydratedDocument<RealEstate>;

@Schema({
  versionKey: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class RealEstate {
  @Prop({
    type: String,
  })
  image?: string;

  @Prop({
    type: String,
    required: [true, 'Title can not be empty!'],
  })
  title: string;

  @Prop({
    type: String,
    required: [true, 'Description can not be empty!'],
  })
  description: string;

  @Prop({
    type: Number,
    required: [true, 'Price can not be empty!'],
  })
  price: number;

  @Prop({
    type: String,
    required: [true, 'Region can not be empty!'],
  })
  region: string;

  @Prop({
    type: String,
    required: [true, 'City can not be empty!'],
  })
  city: string;

  @Prop({
    type: String,
    required: [true, 'Address can not be empty!'],
  })
  address: string;

  @Prop({
    type: String,
  })
  comission?: number;

  @Prop({
    type: Number,
    required: [true, 'Phone can not be empty!'],
  })
  phone: number;

  @Prop({
    type: String,
    required: [true, 'Email can not be empty!'],
  })
  email: string;
}

export const RealEstateSchema = SchemaFactory.createForClass(RealEstate);

RealEstateSchema.pre(/^find/, function (next: NextFunction) {
  this.find({ inactive: { $eq: false } }).select({
    inactive: false,
  });
  next();
});
