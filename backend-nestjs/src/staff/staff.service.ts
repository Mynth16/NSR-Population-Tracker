import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const staff = await this.prisma.staff.findMany({
      orderBy: { lastName: 'asc' },
    });

    return staff.map((s) => ({
      staff_id: s.staffId,
      first_name: s.firstName,
      last_name: s.lastName,
      title: s.title,
      picture: s.picture,
      created_at: s.createdAt,
      updated_at: s.updatedAt,
    }));
  }

  async findOne(id: string) {
    const staff = await this.prisma.staff.findUnique({
      where: { staffId: id },
    });

    if (!staff) return null;

    return {
      staff_id: staff.staffId,
      first_name: staff.firstName,
      last_name: staff.lastName,
      title: staff.title,
      picture: staff.picture,
      created_at: staff.createdAt,
      updated_at: staff.updatedAt,
    };
  }

  async create(createStaffDto: CreateStaffDto) {
    const staff = await this.prisma.staff.create({
      data: {
        firstName: createStaffDto.first_name as string,
        lastName: createStaffDto.last_name as string,
        title: createStaffDto.title as string,
        picture: createStaffDto.picture as string,
      },
    });

    return {
      staff_id: staff.staffId,
      first_name: staff.firstName,
      last_name: staff.lastName,
      title: staff.title,
      picture: staff.picture,
      created_at: staff.createdAt,
      updated_at: staff.updatedAt,
    };
  }

  async update(id: string, updateStaffDto: UpdateStaffDto) {
    const staff = await this.prisma.staff.update({
      where: { staffId: id },
      data: {
        firstName: updateStaffDto.first_name as string,
        lastName: updateStaffDto.last_name as string,
        title: updateStaffDto.title as string,
        picture: updateStaffDto.picture as string,
      },
    });

    return {
      staff_id: staff.staffId,
      first_name: staff.firstName,
      last_name: staff.lastName,
      title: staff.title,
      picture: staff.picture,
      created_at: staff.createdAt,
      updated_at: staff.updatedAt,
    };
  }

  async remove(id: string) {
    // Hard delete for staff
    await this.prisma.staff.delete({
      where: { staffId: id },
    });

    return { message: 'Staff member deleted successfully' };
  }

  async getStaffForAudit(id: string) {
    const staff = await this.prisma.staff.findUnique({
      where: { staffId: id },
      select: { firstName: true, lastName: true, title: true },
    });
    return staff;
  }
}
