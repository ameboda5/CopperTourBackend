import { IsNotEmpty, IsString, IsDate, IsEmail, IsPhoneNumber, MinLength, MaxLength, IsNumber, IsEnum, Matches, IsOptional } from "class-validator";
import { UserRole } from '../enums/user-role.enum';
import { AuthProvider } from "src/auth/authProvider";



export class CreateUserDto {
    // FullName
    @IsString()
    readonly fullName: string;

    // Username
    @IsString()
    readonly userName: string;

    // Email
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
   
    // Password (opcional para usuarios de Google)
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(50)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have an uppercase, lowercase letter, and a number'
    })
    @IsOptional()
    readonly password?: string;

    // BirthDate : día/mes/año
    @IsDate()
    @IsOptional()
    readonly birthDate?: Date;

    // Country
    @IsString()
    @IsOptional()
    readonly country?: string;

    // State
    @IsString()
    @IsOptional()
    readonly state?: string;

    // City
    @IsString()
    @IsOptional()
    readonly city?: string;

    // Phone
    @IsPhoneNumber()
    @IsOptional()
    readonly phone?: number;

    // Número de identificación
    @IsNumber()
    @IsOptional()
    readonly numberIdentification?: number;

    // Código de la empresa
    @IsString()
    @IsOptional()
    readonly companyCode?: string;

    // Rol de usuario
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

    // Proveedor de autenticación (local o google)
     // Proveedor de autenticación (local, google, facebook)
     @IsEnum(AuthProvider)  // Usar el enum actualizado
     @IsOptional()
     readonly authProvider?: AuthProvider;

    // Datos específicos de Google
    @IsString()
    @IsOptional()
    readonly firstName?: string;

    @IsString()
    @IsOptional()
    readonly lastName?: string;

    @IsString()
    @IsOptional()
    readonly picture?: string;

    @IsString()
    @IsOptional()
    readonly accessToken?: string;
}
