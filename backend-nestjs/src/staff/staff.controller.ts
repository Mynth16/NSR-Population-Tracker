import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Headers,
  NotFoundException,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { AuditTrailService } from '../audit-trail/audit-trail.service';

@Controller('api/staff')
export class StaffController {
  constructor(
    private readonly staffService: StaffService,
    private readonly auditTrailService: AuditTrailService,
  ) {}

  @Post()
  async create(
    @Body() createStaffDto: CreateStaffDto,
    @Headers('x-user-id') userId?: string,
  ) {
    const staff = await this.staffService.create(createStaffDto);

    await this.auditTrailService.logAudit(
      'staff',
      staff.staff_id,
      `Created staff: ${createStaffDto.first_name} ${createStaffDto.last_name} | Title: ${createStaffDto.title}`,
      'create',
      userId,
    );

    return staff;
  }

  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const staff = await this.staffService.findOne(id);
    if (!staff) {
      throw new NotFoundException('Staff member not found');
    }
    return staff;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStaffDto: UpdateStaffDto,
    @Headers('x-user-id') userId?: string,
  ) {
    const oldData = await this.staffService.findOne(id);
    const staff = await this.staffService.update(id, updateStaffDto);

    if (oldData) {
      await this.auditTrailService.logAudit(
        'staff',
        id,
        `Updated staff: ${updateStaffDto.first_name} ${updateStaffDto.last_name}`,
        'update',
        userId,
      );
    }

    return staff;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Headers('x-user-id') userId?: string) {
    const staffData = await this.staffService.getStaffForAudit(id);
    const result = await this.staffService.remove(id);

    if (staffData) {
      await this.auditTrailService.logAudit(
        'staff',
        id,
        `Deleted staff: ${staffData.firstName} ${staffData.lastName}`,
        'delete',
        userId,
      );
    }

    return result;
  }
}
