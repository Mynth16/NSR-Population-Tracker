import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPopulationStats() {
    // Get active residents for statistics
    const residents = await this.prisma.resident.findMany({
      where: { status: 'active' },
      select: {
        gender: true,
        birthDate: true,
        householdId: true,
      },
    });

    const totalPopulation = residents.length;
    const maleCount = residents.filter((r) => r.gender === 'male').length;
    const femaleCount = residents.filter((r) => r.gender === 'female').length;
    const totalHouseholds = new Set(residents.map((r) => r.householdId)).size;

    // Calculate average age
    const now = new Date();
    const ages = residents.map((r) => {
      const birthDate = new Date(r.birthDate);
      let age = now.getFullYear() - birthDate.getFullYear();
      const monthDiff = now.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && now.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    });
    const averageAge =
      ages.length > 0 ? ages.reduce((a, b) => a + b, 0) / ages.length : 0;

    return {
      total_population: totalPopulation,
      male_count: maleCount,
      female_count: femaleCount,
      total_households: totalHouseholds,
      average_age: Number(averageAge.toFixed(2)),
    };
  }

  async getZoneStats() {
    // Get all active households with their residents
    const households = await this.prisma.household.findMany({
      where: { status: 'active' },
      include: {
        residents: {
          where: { status: 'active' },
          select: { gender: true },
        },
      },
    });

    // Group by zone
    const zoneMap = new Map<
      number,
      { householdCount: number; population: number; male: number; female: number }
    >();

    for (const h of households) {
      const existing = zoneMap.get(h.zoneNum) || {
        householdCount: 0,
        population: 0,
        male: 0,
        female: 0,
      };

      existing.householdCount++;
      existing.population += h.residents.length;
      existing.male += h.residents.filter((r) => r.gender === 'male').length;
      existing.female += h.residents.filter((r) => r.gender === 'female').length;

      zoneMap.set(h.zoneNum, existing);
    }

    // Convert to array and sort by zone number
    const zoneStats = Array.from(zoneMap.entries())
      .map(([zoneNum, stats]) => ({
        zone_num: zoneNum,
        household_count: stats.householdCount,
        population: stats.population,
        male_count: stats.male,
        female_count: stats.female,
      }))
      .sort((a, b) => a.zone_num - b.zone_num);

    return zoneStats;
  }

  async getAgeGroupStats() {
    const residents = await this.prisma.resident.findMany({
      where: { status: 'active' },
      select: { birthDate: true },
    });

    const now = new Date();
    const ageGroups = {
      '0-17': 0,
      '18-35': 0,
      '36-59': 0,
      '60+': 0,
    };

    for (const r of residents) {
      const birthDate = new Date(r.birthDate);
      let age = now.getFullYear() - birthDate.getFullYear();
      const monthDiff = now.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && now.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        ageGroups['0-17']++;
      } else if (age < 36) {
        ageGroups['18-35']++;
      } else if (age < 60) {
        ageGroups['36-59']++;
      } else {
        ageGroups['60+']++;
      }
    }

    return Object.entries(ageGroups).map(([ageGroup, count]) => ({
      age_group: ageGroup,
      count,
    }));
  }
}
