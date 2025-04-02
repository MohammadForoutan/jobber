import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prismaService.user.create({
      data: { ...data, password: hashedPassword },
    });
  }

  async getUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }
}
