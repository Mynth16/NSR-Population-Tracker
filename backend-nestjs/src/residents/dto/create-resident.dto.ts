import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';

export enum Gender {
  male = 'male',
  female = 'female',
}

export enum CivilStatus {
  single = 'single',
  married = 'married',
  widowed = 'widowed',
  separated = 'separated',
  divorced = 'divorced',
}

export enum ResidentStatus {
  active = 'active',
  deceased = 'deceased',
  moved = 'moved',
  archived = 'archived',
}

export class CreateResidentDto {
  @IsOptional()
  @IsString()
  household_id?: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsDateString()
  birth_date: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsEnum(CivilStatus)
  civil_status: CivilStatus;

  @IsOptional()
  @IsString()
  educational_attainment?: string;

  @IsOptional()
  @IsString()
  contact_number?: string;

  @IsOptional()
  @IsString()
  email?: string;
}
