import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { ChannelService } from './channel.service';

@Controller('channel')
export class ChannelController {
  constructor(private readonly ChannelService: ChannelService) {}


  // @Post()
  // postChannels(@Body('ChannelIds') ChannelIds: string) {
  //   return this.ChannelService.postChannels(ChannelIds);
  // }
  
  // @Get('/userChannel')
  // getUserChannels(@Query('userId') userId: string) {
  //   return this.ChannelService.getUserChannels(userId);
  // }

  // @Get('/ChannelUser')
  // getChannelUsers(@Query('ChannelId') ChannelId: string) {
  //   return this.ChannelService.getChannelUsers(ChannelId);
  // }

  // @Get('/findByName')
  // getChannelsByName(@Query('ChannelName') ChannelName: string) {
  //   return this.ChannelService.getChannelsByName(ChannelName);
  // }

  // @Get('/ChannelMessages')
  // getChannelMessages(@Query('ChannelId') ChannelId: string, @Query('current') current: number, @Query('pageSize') pageSize: number) {
  //   return this.ChannelService.getChannelMessages(ChannelId, current, pageSize);
  // }
}
