import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { PrivateService } from './private.service';

@Controller('private')
export class PrivateController {
  constructor(private readonly PrivateService: PrivateService) {}
}
