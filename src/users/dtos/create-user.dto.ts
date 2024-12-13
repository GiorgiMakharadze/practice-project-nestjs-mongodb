import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class CreateUserSettingsDto {
  @IsOptional()
  @IsBoolean()
  recieveEmails?: boolean;

  @IsOptional()
  @IsBoolean()
  recieveNotifications?: boolean;

  @IsOptional()
  @IsBoolean()
  recieveSMS?: boolean;
}

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsUrl()
  @IsOptional()
  avatarUrl: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUserDto)
  settings?: CreateUserSettingsDto;
}
