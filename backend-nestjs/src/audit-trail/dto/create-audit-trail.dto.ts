import { IsString, IsOptional, IsEnum } from 'class-validator';

export enum RecordType {
  household = 'household',
  resident = 'resident',
  staff = 'staff',
  account = 'account',
}

export enum ChangeType {
  create = 'create',
  update = 'update',
  delete = 'delete',
}

export class CreateAuditTrailDto {
  @IsEnum(RecordType)
  record_type: RecordType;

  @IsString()
  record_id: string;

  @IsOptional()
  @IsString()
  details?: string;

  @IsEnum(ChangeType)
  change_type: ChangeType;

  @IsOptional()
  @IsString()
  acc_id?: string;
}
