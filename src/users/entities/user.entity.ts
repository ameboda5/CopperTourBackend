import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserRole } from '../enums/user-role.enum';
import { Document } from 'mongoose';

export type UserDocument = User & Document;


@Schema()
export class User {
  // FullName
  @Prop()
  fullName: string;

  // Username
  @Prop()
  userName: string;

  // BirthDate
  @Prop()
  birthDate: Date;

  // Country
  @Prop()
  country: string;

  // State
  @Prop()
  state: string;

  // City
  @Prop()
  city: string;

  // Email
  @Prop({ required: true, unique: true })
  email: string;

  // Phone
  @Prop()
  phone: number;

  // Password
  @Prop({
    required: function (this: User) {
      // Solo es requerido si el proveedor de autenticación no es Google
      return this.authProvider !== "google";
    },
  })
  password: string;

  // numberIdentification
  @Prop()
  numberIdentification: number;

  // companyCode
  @Prop()
  companyCode: string;

  // role user
  @Prop({ enum: UserRole, default: UserRole.CLIENT })
  role: UserRole;

  // Proveedor de autenticación (local o google)
  @Prop({ default: "local" })
  authProvider: string;

  // Información de usuario autenticado con Google
  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop()
  picture?: string;

  // Token de acceso de Google
  @Prop()
  accessToken?: string;
}



export const UserSchema= SchemaFactory.createForClass(User); 