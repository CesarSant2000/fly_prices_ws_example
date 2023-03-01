import { GatewayEvents } from './events.gateway';
import { Module } from '@nestjs/common';

@Module({
  providers: [GatewayEvents],
})
export class EventsModule {}
