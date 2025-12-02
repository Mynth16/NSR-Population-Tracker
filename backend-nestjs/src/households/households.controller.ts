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
import { HouseholdsService } from './households.service';
import { CreateHouseholdDto } from './dto/create-household.dto';
import { UpdateHouseholdDto } from './dto/update-household.dto';
import { AuditTrailService } from '../audit-trail/audit-trail.service';

@Controller('api/households')
export class HouseholdsController {
  constructor(
    private readonly householdsService: HouseholdsService,
    private readonly auditTrailService: AuditTrailService,
  ) {}

  @Post()
  async create(
    @Body() createHouseholdDto: CreateHouseholdDto,
    @Headers('x-user-id') userId?: string,
  ) {
    const household = await this.householdsService.create(createHouseholdDto);

    await this.auditTrailService.logAudit(
      'household',
      household.household_id,
      `Created household: Zone ${createHouseholdDto.zone_num}, House ${createHouseholdDto.house_num} | Address: ${createHouseholdDto.address}`,
      'create',
      userId,
    );

    return household;
  }

  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('zone') zone?: string,
    @Query('search') search?: string,
  ) {
    return this.householdsService.findAll(
      status,
      zone ? Number.parseInt(zone, 10) : undefined,
      search,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const household = await this.householdsService.findOne(id);
    if (!household) {
      throw new NotFoundException('Household not found');
    }
    return household;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHouseholdDto: UpdateHouseholdDto,
    @Headers('x-user-id') userId?: string,
  ) {
    const oldData = await this.householdsService.findOne(id);
    const household = await this.householdsService.update(id, updateHouseholdDto);

    if (oldData) {
      await this.auditTrailService.logAudit(
        'household',
        id,
        `Updated household: Zone ${updateHouseholdDto.zone_num}, House ${updateHouseholdDto.house_num}`,
        'update',
        userId,
      );
    }

    return household;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Headers('x-user-id') userId?: string) {
    const householdData = await this.householdsService.getHouseholdForAudit(id);
    const result = await this.householdsService.remove(id);

    if (householdData) {
      await this.auditTrailService.logAudit(
        'household',
        id,
        `Archived household: Zone ${householdData.zoneNum}, House ${householdData.houseNum}`,
        'delete',
        userId,
      );
    }

    return result;
  }
}
