import { PartialType } from '@nestjs/mapped-types';
import { CreateResidentDto, ResidentStatus } from './create-resident.dto';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateResidentDto extends PartialType(CreateResidentDto) {
  @IsOptional()
  @IsEnum(ResidentStatus)
  status?: ResidentStatus;
}
