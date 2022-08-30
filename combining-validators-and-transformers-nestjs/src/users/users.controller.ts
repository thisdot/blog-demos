import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

class GetUsersQuery {
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  userIds: string[];

  @IsOptional()
  @Transform(({ value }) => value === '1' || value === 'true')
  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  nameContains: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  registeredSince: Date;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pageSize: number;
}

class User {
  id: string;
  name: string;
  active = false;
}

@Controller('users')
export class UsersController {
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  getUsers(@Query() query: GetUsersQuery): User[] {
    console.log(JSON.stringify(query));
    return [
      { id: '1', name: 'Zeus Carver', active: true },
      { id: '2', name: 'Holly Gennero', active: true },
    ];
  }
}
