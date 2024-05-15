import { SocketEventsEnum } from 'src/types/socket-events.enum';
import io, { Socket } from 'socket.io-client';
import { inject } from 'vue';
import { Appeal } from 'src/types/appeal.interface';
import { EventBus } from 'quasar';

export default class SocketClient {
  public static instance: SocketClient;
  public static client: null | Socket = null;
  private bus = <EventBus>inject('bus');

  constructor(token = '') {
    if (!SocketClient.instance) {
      SocketClient.instance = this;
      this.connect(token);
    }
  }

  // public static on(e: SocketEventsEnum, f: (data: any) => void) {
  //   SocketClient.client?.on(e, (data: any) => {
  //     f(data);
  //   });
  // }

  public static connect(token: string) {
    SocketClient.instance = new SocketClient(token);
  }

  private connect(token: string) {
    const params = {
      secure: true,
      forceNew: true,
      head: { token },
      extraHeaders: { Authorization: token },
    };
    SocketClient.client = io('http://localhost:3000', params) as Socket;

    for (const event of Object.values(SocketEventsEnum)) {
      SocketClient.client.on(event, (data: Appeal) => {
        SocketClient.client?.emit(event, data);
      });
    }
  }
}
