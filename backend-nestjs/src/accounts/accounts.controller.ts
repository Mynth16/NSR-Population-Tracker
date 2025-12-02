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
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AuditTrailService } from '../audit-trail/audit-trail.service';

@Controller('api/accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly auditTrailService: AuditTrailService,
  ) {}

  @Post()
  async create(
    @Body() createAccountDto: CreateAccountDto,
    @Headers('x-user-id') userId?: string,
  ) {
    const account = await this.accountsService.create(createAccountDto);

    await this.auditTrailService.logAudit(
      'account',
      account.acc_id,
      `Created account: ${createAccountDto.username} | Role: ${createAccountDto.role}`,
      'create',
      userId,
    );

    return account;
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const account = await this.accountsService.findOne(id);
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return account;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
    @Headers('x-user-id') userId?: string,
  ) {
    const oldData = await this.accountsService.findOne(id);
    const account = await this.accountsService.update(id, updateAccountDto);

    if (oldData) {
      await this.auditTrailService.logAudit(
        'account',
        id,
        `Updated account: ${updateAccountDto.username || oldData.username}`,
        'update',
        userId,
      );
    }

    return account;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Headers('x-user-id') userId?: string) {
    const accountData = await this.accountsService.findOne(id);
    const result = await this.accountsService.remove(id);

    if (accountData) {
      await this.auditTrailService.logAudit(
        'account',
        id,
        `Deleted account: ${accountData.username}`,
        'delete',
        userId,
      );
    }

    return result;
  }
}
