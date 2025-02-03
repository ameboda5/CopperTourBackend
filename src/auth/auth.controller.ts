import { Controller, Request, Post, UseGuards, Get, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard) // Protege esta ruta con JwtAuthGuard
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // Devuelve el usuario autenticado
  }

  // Endpoint para iniciar sesión con Google
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req) {
    // Esto redirigirá a Google para la autenticación
  }

  // Redirección después de la autenticación con Google
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Request() req) {
    // Verifica si el usuario ya existe en la base de datos o crea uno nuevo
    const user = await this.authService.validateUserByGoogle(req.user);
  
    return {
      message: 'Usuario autenticado con Google',
      user, // Ahora retorna el usuario guardado en la base de datos
    };
  }

  
}

