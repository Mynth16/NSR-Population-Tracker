import { Injectable } from '@nestjs/common';
import { CreateResidentDto } from './dto/create-resident.dto';
import { UpdateResidentDto } from './dto/update-resident.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class ResidentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(status: string = 'active', search?: string) {
    const where: Prisma.ResidentWhereInput = {
      status: status as Prisma.EnumResidentStatusFilter,
    };

    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
      ];
    }

    const residents = await this.prisma.resident.findMany({
      where,
      include: {
        household: {
          select: {
            houseNum: true,
            address: true,
            zoneNum: true,
          },
        },
      },
      orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }],
    });

    // Transform to match original API response format
    return residents.map((r) => ({
      resident_id: r.residentId,
      household_id: r.householdId,
      first_name: r.firstName,
      last_name: r.lastName,
      birth_date: r.birthDate,
      gender: r.gender,
      civil_status: r.civilStatus,
      educational_attainment: r.educationalAttainment,
      contact_number: r.contactNumber,
      email: r.email,
      status: r.status,
      created_at: r.createdAt,
      updated_at: r.updatedAt,
      house_num: r.household?.houseNum,
      household_address: r.household?.address,
      zone_num: r.household?.zoneNum,
    }));
  }

  async findOne(id: string) {
    const resident = await this.prisma.resident.findUnique({
      where: { residentId: id },
      include: {
        household: {
          select: {
            houseNum: true,
            address: true,
            zoneNum: true,
          },
        },
      },
    });

    if (!resident) return null;

    return {
      resident_id: resident.residentId,
      household_id: resident.householdId,
      first_name: resident.firstName,
      last_name: resident.lastName,
      birth_date: resident.birthDate,
      gender: resident.gender,
      civil_status: resident.civilStatus,
      educational_attainment: resident.educationalAttainment,
      contact_number: resident.contactNumber,
      email: resident.email,
      status: resident.status,
      created_at: resident.createdAt,
      updated_at: resident.updatedAt,
      house_num: resident.household?.houseNum,
      household_address: resident.household?.address,
      zone_num: resident.household?.zoneNum,
    };
  }

  async create(createResidentDto: CreateResidentDto) {
    const resident = await this.prisma.resident.create({
      data: {
        householdId: createResidentDto.household_id,
        firstName: createResidentDto.first_name,
        lastName: createResidentDto.last_name,
        birthDate: new Date(createResidentDto.birth_date),
        gender: createResidentDto.gender,
        civilStatus: createResidentDto.civil_status,
        educationalAttainment: createResidentDto.educational_attainment,
        contactNumber: createResidentDto.contact_number,
        email: createResidentDto.email,
      },
    });

    return {
      resident_id: resident.residentId,
      household_id: resident.householdId,
      first_name: resident.firstName,
      last_name: resident.lastName,
      birth_date: resident.birthDate,
      gender: resident.gender,
      civil_status: resident.civilStatus,
      educational_attainment: resident.educationalAttainment,
      contact_number: resident.contactNumber,
      email: resident.email,
      status: resident.status,
      created_at: resident.createdAt,
      updated_at: resident.updatedAt,
    };
  }

  async update(id: string, updateResidentDto: UpdateResidentDto) {
    const resident = await this.prisma.resident.update({
      where: { residentId: id },
      data: {
        householdId: updateResidentDto.household_id,
        firstName: updateResidentDto.first_name,
        lastName: updateResidentDto.last_name,
        birthDate: updateResidentDto.birth_date
          ? new Date(updateResidentDto.birth_date)
          : undefined,
        gender: updateResidentDto.gender,
        civilStatus: updateResidentDto.civil_status,
        educationalAttainment: updateResidentDto.educational_attainment,
        contactNumber: updateResidentDto.contact_number,
        email: updateResidentDto.email,
        status: updateResidentDto.status,
      },
    });

    return {
      resident_id: resident.residentId,
      household_id: resident.householdId,
      first_name: resident.firstName,
      last_name: resident.lastName,
      birth_date: resident.birthDate,
      gender: resident.gender,
      civil_status: resident.civilStatus,
      educational_attainment: resident.educationalAttainment,
      contact_number: resident.contactNumber,
      email: resident.email,
      status: resident.status,
      created_at: resident.createdAt,
      updated_at: resident.updatedAt,
    };
  }

  async remove(id: string) {
    // Soft delete by setting status to archived
    await this.prisma.resident.update({
      where: { residentId: id },
      data: { status: 'archived' },
    });

    return { message: 'Resident archived successfully' };
  }

  async getResidentForAudit(id: string) {
    const resident = await this.prisma.resident.findUnique({
      where: { residentId: id },
      select: { firstName: true, lastName: true },
    });
    return resident;
  }
}
