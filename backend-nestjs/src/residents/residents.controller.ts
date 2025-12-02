import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Headers,
  NotFoundException,
} from '@nestjs/common';
import { ResidentsService } from './residents.service';
import { CreateResidentDto } from './dto/create-resident.dto';
import { UpdateResidentDto } from './dto/update-resident.dto';
import { AuditTrailService } from '../audit-trail/audit-trail.service';

@Controller('api/residents')
export class ResidentsController {
  constructor(
    private readonly residentsService: ResidentsService,
    private readonly auditTrailService: AuditTrailService,
  ) {}

  @Post()
  async create(
    @Body() createResidentDto: CreateResidentDto,
    @Headers('x-user-id') userId?: string,
  ) {
    const resident = await this.residentsService.create(createResidentDto);

    // Log audit trail
    await this.auditTrailService.logAudit(
      'resident',
      resident.resident_id,
      `Created resident: ${createResidentDto.first_name} ${createResidentDto.last_name} | Gender: ${createResidentDto.gender} | Civil Status: ${createResidentDto.civil_status} | Household ID: ${createResidentDto.household_id || 'None'}`,
      'create',
      userId,
    );

    return resident;
  }

  @Get()
  findAll(
    @Query('status') status: string = 'active',
    @Query('search') search?: string,
  ) {
    return this.residentsService.findAll(status, search);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const resident = await this.residentsService.findOne(id);
    if (!resident) {
      throw new NotFoundException('Resident not found');
    }
    return resident;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateResidentDto: UpdateResidentDto,
    @Headers('x-user-id') userId?: string,
  ) {
    const oldData = await this.residentsService.findOne(id);
    const resident = await this.residentsService.update(id, updateResidentDto);

    // Log audit trail
    if (oldData) {
      await this.auditTrailService.logAudit(
        'resident',
        id,
        `Updated resident: ${updateResidentDto.first_name} ${updateResidentDto.last_name}`,
        'update',
        userId,
      );
    }

    return resident;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Headers('x-user-id') userId?: string) {
    const residentData = await this.residentsService.getResidentForAudit(id);
    const result = await this.residentsService.remove(id);

    // Log audit trail
    if (residentData) {
      await this.auditTrailService.logAudit(
        'resident',
        id,
        `Archived resident: ${residentData.firstName} ${residentData.lastName}`,
        'delete',
        userId,
      );
    }

    return result;
  }
}
