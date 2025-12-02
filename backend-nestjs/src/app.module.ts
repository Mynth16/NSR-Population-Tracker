import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ResidentsModule } from './residents/residents.module';
import { HouseholdsModule } from './households/households.module';
import { StaffModule } from './staff/staff.module';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { AuditTrailModule } from './audit-trail/audit-trail.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [PrismaModule, ResidentsModule, HouseholdsModule, StaffModule, AccountsModule, AuthModule, AuditTrailModule, StatisticsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
