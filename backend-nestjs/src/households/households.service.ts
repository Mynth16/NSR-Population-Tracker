import { Injectable } from '@nestjs/common';
import { CreateHouseholdDto } from './dto/create-household.dto';
import { UpdateHouseholdDto } from './dto/update-household.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HouseholdsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(status?: string, zone?: number, search?: string) {
    const where: any = {};

    if (status) {
      where.status = status as any;
    }

    if (zone) {
      where.zoneNum = zone;
    }

    if (search) {
      where.OR = [
        { address: { contains: search } },
        { houseNum: { contains: search } },
      ];
    }

    const households = await this.prisma.household.findMany({
      where,
      include: {
        headResident: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        residents: {
          where: { status: 'active' },
          select: { residentId: true },
        },
      },
      orderBy: [{ zoneNum: 'asc' }, { houseNum: 'asc' }],
    });

    return households.map((h) => ({
      household_id: h.householdId,
      zone_num: h.zoneNum,
      house_num: h.houseNum,
      address: h.address,
      status: h.status,
      head_resident_id: h.headResidentId,
      created_at: h.createdAt,
      updated_at: h.updatedAt,
      head_first_name: h.headResident?.firstName,
      head_last_name: h.headResident?.lastName,
      resident_count: h.residents.length,
    }));
  }

  async findOne(id: string) {
    const household = await this.prisma.household.findUnique({
      where: { householdId: id },
      include: {
        headResident: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        residents: {
          where: { status: 'active' },
          select: {
            residentId: true,
            firstName: true,
            lastName: true,
            birthDate: true,
            gender: true,
            civilStatus: true,
          },
        },
      },
    });

    if (!household) return null;

    return {
      household_id: household.householdId,
      zone_num: household.zoneNum,
      house_num: household.houseNum,
      address: household.address,
      status: household.status,
      head_resident_id: household.headResidentId,
      created_at: household.createdAt,
      updated_at: household.updatedAt,
      head_first_name: household.headResident?.firstName,
      head_last_name: household.headResident?.lastName,
      residents: household.residents.map((r) => ({
        resident_id: r.residentId,
        first_name: r.firstName,
        last_name: r.lastName,
        birth_date: r.birthDate,
        gender: r.gender,
        civil_status: r.civilStatus,
      })),
    };
  }

  async create(createHouseholdDto: CreateHouseholdDto) {
    const household = await this.prisma.household.create({
      data: {
        zoneNum: createHouseholdDto.zone_num,
        houseNum: createHouseholdDto.house_num,
        address: createHouseholdDto.address,
        headResidentId: createHouseholdDto.head_resident_id,
      },
    });

    return {
      household_id: household.householdId,
      zone_num: household.zoneNum,
      house_num: household.houseNum,
      address: household.address,
      status: household.status,
      head_resident_id: household.headResidentId,
      created_at: household.createdAt,
      updated_at: household.updatedAt,
    };
  }

  async update(id: string, updateHouseholdDto: UpdateHouseholdDto) {
    const household = await this.prisma.household.update({
      where: { householdId: id },
      data: {
        zoneNum: updateHouseholdDto.zone_num,
        houseNum: updateHouseholdDto.house_num,
        address: updateHouseholdDto.address,
        status: updateHouseholdDto.status as any,
        headResidentId: updateHouseholdDto.head_resident_id,
      },
    });

    return {
      household_id: household.householdId,
      zone_num: household.zoneNum,
      house_num: household.houseNum,
      address: household.address,
      status: household.status,
      head_resident_id: household.headResidentId,
      created_at: household.createdAt,
      updated_at: household.updatedAt,
    };
  }

  async remove(id: string) {
    // Soft delete by setting status to archived
    await this.prisma.household.update({
      where: { householdId: id },
      data: { status: 'archived' },
    });

    return { message: 'Household archived successfully' };
  }

  async getHouseholdForAudit(id: string) {
    const household = await this.prisma.household.findUnique({
      where: { householdId: id },
      select: { zoneNum: true, houseNum: true, address: true },
    });
    return household;
  }
}
