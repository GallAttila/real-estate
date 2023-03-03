import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Gender, UserRole } from 'src/constants';
import validator from 'validator';

export type UserDocument = HydratedDocument<User>;

@Schema({
  versionKey: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class User {
  @Prop({
    type: String,
    required: [true, 'Email can not be empty!'],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email!'],
  })
  email: string;

  @Prop({
    type: String,
    required: [true, 'Password can not be empty!'],
    validate: [
      validator.isStrongPassword,
      'Please provide a stronger password!',
    ],
  })
  password: string;

  @Prop({
    type: String,
    required: [true, 'Username can not be empty!'],
    unique: true,
  })
  username: string;

  @Prop({
    type: String,
    required: [true, 'First name can not be empty!'],
  })
  firstName: string;

  @Prop({
    type: String,
    required: [true, 'Last name can not be empty!'],
  })
  lastName: string;

  @Prop({
    type: String,
    required: [true, 'Gender can not be empty!'],
    enum: Object.values(Gender),
  })
  gender: Gender;

  @Prop({
    type: Number,
    required: [true, 'Age can not be empty!'],
  })
  age: number;

  @Prop({
    type: String,
    required: [true, 'Role can not be empty!'],
    enum: Object.values(UserRole),
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
