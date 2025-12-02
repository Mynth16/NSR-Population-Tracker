import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AuditTrailService } from './audit-trail.service';
import { CreateAuditTrailDto } from './dto/create-audit-trail.dto';

@Controller('api/audit-trail')
export class AuditTrailController {
  constructor(private readonly auditTrailService: AuditTrailService) {}

  @Post()
  create(@Body() createAuditTrailDto: CreateAuditTrailDto) {
    return this.auditTrailService.create(createAuditTrailDto);
  }

  @Get()
  findAll(
    @Query('record_type') recordType?: string,
    @Query('record_id') recordId?: string,
    @Query('limit') limit?: string,
  ) {
    return this.auditTrailService.findAll(
      recordType,
      recordId,
      limit ? Number.parseInt(limit, 10) : 100,
    );
  }
}
