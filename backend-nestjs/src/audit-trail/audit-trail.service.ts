import { Injectable } from '@nestjs/common';
import { CreateAuditTrailDto } from './dto/create-audit-trail.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ChangeType, RecordType } from 'generated/prisma/enums';

@Injectable()
export class AuditTrailService {
  constructor(private readonly prisma: PrismaService) {}

  // Helper function to log audit trail entries (fails silently)
  async logAudit(
    recordType: string,
    recordId: string,
    details: string,
    changeType: string,
    accId?: string,
  ) {
    try {
      await this.prisma.auditTrail.create({
        data: {
          recordType: recordType as RecordType,
          recordId: String(recordId),
          details,
          changeType: changeType as ChangeType,
          accId: accId || null,
        },
      });
    } catch (error) {
      console.error('Audit trail logging failed:', error);
      // Fail silently - don't throw error
    }
  }

  async create(createAuditTrailDto: CreateAuditTrailDto) {
    const entry = await this.prisma.auditTrail.create({
      data: {
        recordType: createAuditTrailDto.record_type as any,
        recordId: createAuditTrailDto.record_id,
        details: createAuditTrailDto.details,
        changeType: createAuditTrailDto.change_type as any,
        accId: createAuditTrailDto.acc_id,
      },
      include: {
        account: {
          select: { username: true },
        },
      },
    });

    return {
      audit_id: entry.auditId,
      record_type: entry.recordType,
      record_id: entry.recordId,
      details: entry.details,
      change_type: entry.changeType,
      change_date: entry.changeDate,
      acc_id: entry.accId,
      username: entry.account?.username,
    };
  }

  async findAll(recordType?: string, recordId?: string, limit: number = 100) {
    const where: any = {};

    if (recordType) {
      where.recordType = recordType as any;
    }

    if (recordId) {
      where.recordId = recordId;
    }

    const entries = await this.prisma.auditTrail.findMany({
      where,
      include: {
        account: {
          select: { username: true },
        },
      },
      orderBy: { changeDate: 'desc' },
      take: limit,
    });

    return entries.map((entry) => ({
      audit_id: entry.auditId,
      record_type: entry.recordType,
      record_id: entry.recordId,
      details: entry.details,
      change_type: entry.changeType,
      change_date: entry.changeDate,
      acc_id: entry.accId,
      username: entry.account?.username,
    }));
  }
}
