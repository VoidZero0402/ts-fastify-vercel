import Fastify, { FastifyReply, FastifyRequest } from 'fastify';

const fastify = Fastify({
    logger: true,
});

fastify.get('/', async (req, reply) => {
    reply.send({
        message: 'Hello From Fastify',
        data: {
            users: [],
        },
    });
});

if (process.env.NODE_ENV === 'development') {
    async function run() {
        await fastify.ready();
        await fastify.listen({ port: 4000 });
        console.log('Fastify Running On Port 4000');
    }

    run();
}

export default async function handler(req: FastifyRequest, reply: FastifyReply) {
    await fastify.ready();
    fastify.server.emit('request', req, reply);
}
