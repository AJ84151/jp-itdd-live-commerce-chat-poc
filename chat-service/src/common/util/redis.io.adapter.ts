
import { ServerOptions } from 'socket.io';
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import { IoAdapter } from '@nestjs/platform-socket.io';

export class RedisIoAdapter extends IoAdapter {
    private adapterConstructor: ReturnType<typeof createAdapter>;

    async connectToRedis(): Promise<void> {
        const pubClient = createClient({ url: `redis://localhost:6379` });
        const subClient = pubClient.duplicate();
        await Promise.all([pubClient.connect(), subClient.connect()]);
        this.adapterConstructor = createAdapter(pubClient, subClient);
        console.log("connectToRedis");
    }

    createIOServer(port: number, options?: ServerOptions): any {
        const server = super.createIOServer(port, options);
        server.adapter(this.adapterConstructor);
        console.log("createIOServer");
        return server;
    }
}