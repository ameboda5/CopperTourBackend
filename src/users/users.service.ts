import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, isValidObjectId } from "mongoose";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./entities/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  createUser(newUser: CreateUserDto): void | PromiseLike<void> {
    throw new Error("Method not implemented.");
  }
  async findByEmail(email: string): Promise<UserDocument | null> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      return user || null; // Devuelve null si no se encuentra el usuario
    } catch (error) {
      console.error(`Error inesperado al buscar el usuario con email ${email}:`, error);
      throw new InternalServerErrorException("Ocurrió un error inesperado");
    }
  }
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {} //se inyecta la entidad user

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    try {
      // Verificar si el email o el username ya existen
      const existingUser = await this.userModel.findOne({
        $or: [
          { email: createUserDto.email },
          { userName: createUserDto.userName },
        ],
      });

      if (existingUser) {
        throw new BadRequestException("Usuario con email o nombre de usuario ya existente");
      }

      // Hashear la contraseña si se proporciona y el proveedor no es Google
      const hashedPassword =
        createUserDto.authProvider === "google"
          ? null
          : await bcrypt.hash(createUserDto.password || "", 10);

      const createdUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword, // Solo se asigna si no es autenticación de Google
      });

      return await createdUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException("Usuario con datos ya existentes");
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error("Unexpected error during user creation:", error);
      throw new InternalServerErrorException("Ocurrió un error inesperado");
    }
  }


  async findAll(): Promise<UserDocument[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException("An unexpected error occurred");
    }
  }

  async findOne(id: string): Promise<UserDocument> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`El ID ${id} no es un ObjectId válido`);
    }

    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error(
        `Error inesperado al buscar el usuario con ID ${id}:`,
        error
      );
      throw new InternalServerErrorException("Ocurrió un error inesperado");
    }
  }

  async findByUserName(userName: string): Promise<UserDocument> {
    try {
      const user = await this.userModel.findOne({ userName }).exec();
      if (!user) {
        throw new NotFoundException(
          `Usuario con nombre de usuario ${userName} no encontrado`
        );
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(
        `Error inesperado al buscar el usuario con nombre de usuario ${userName}:`,
        error
      );
      throw new InternalServerErrorException("Ocurrió un error inesperado");
    }
  }

  async updateGoogleProfile(
    id: string,
    updates: {
      firstName: string;
      lastName: string;
      picture: string;
      accessToken: string;
      authProvider: string;
    }
  ): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<UserDocument> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`El ID ${id} no es un ObjectId válido`);
    }

    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, {
          new: true, // Devuelve el documento después de la actualización
          runValidators: true, // Ejecuta las validaciones definidas en el esquema
        })
        .exec();

      if (!updatedUser) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }

      return updatedUser;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException("Usuario con datos ya existentes");
      }
      console.error(
        `Error inesperado al actualizar el usuario con ID ${id}:`,
        error
      );
      throw new InternalServerErrorException("Ocurrió un error inesperado");
    }
  }

  async remove(id: string): Promise<UserDocument> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`El ID ${id} no es un ObjectId válido`);
    }

    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
      if (!deletedUser) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }
      return deletedUser;
    } catch (error) {
      console.error(
        `Error inesperado al eliminar el usuario con ID ${id}:`,
        error
      );
      throw new InternalServerErrorException("Ocurrió un error inesperado");
    }
  }
}
