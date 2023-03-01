// src/events/events.gateway.ts
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway(
  2803, // Port where the server will be listening
  {
    cors: {
      origin: '*', // Origin allowed to connect
    },
  },
)
export class GatewayEvents {
  @SubscribeMessage('purchaseSeats')
  handlePurchase(
    @MessageBody()
    message: { name: string; message: string },
    @ConnectedSocket()
    socket: Socket,
  ) {
    const returnMessage = {
      name: message.name,
      message: message.message,
    };
    socket.broadcast.emit('listenPurchase', returnMessage);
    return { message: 'ok' };
  }
}
