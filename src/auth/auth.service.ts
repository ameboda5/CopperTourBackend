
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDocument } from 'src/users/entities/user.entity';
import { AuthProvider } from './authProvider';


@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUserName(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
  
    if (!username || !password) {
      throw new UnauthorizedException("Username and password are required");
    }
  
    const user = await this.usersService.findByUserName(username);
    if (!user) {
      throw new UnauthorizedException("Invalid username");
    }
  
  
    if (!user.password) {
      throw new UnauthorizedException("User has no password set");
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password");
    }
  
    const payload = { username: user.userName, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
  async validateUserByGoogle(profile: any): Promise<UserDocument> {
    const { email, firstName, lastName } = profile;
  
    let user = await this.usersService.findByEmail(email);
    if (!user) {
      const newUser: CreateUserDto = {
        fullName: `${firstName} ${lastName}`,
        userName: email.split('@')[0],
        email,
        authProvider: AuthProvider.GOOGLE,  
        firstName,
        lastName,
        picture: profile.picture,
        accessToken: profile.accessToken,
      };
      console.log("Creando nuevo usuario:", newUser); // Para verificar los datos
      user = await this.usersService.create(newUser);
      console.log("Usuario creado:", user);
    }
  
    return user;
  }


  



  
}
