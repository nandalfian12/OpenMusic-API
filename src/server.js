require('dotenv').config();

const Hapi = require('@hapi/hapi');
const AlbumsService = require('./services/postgres/AlbumsService');
const albums = require('./api/albums');

const init = async () => {
  const albumsService = new AlbumsService();
  const server = Hapi.server({
    // Server Configuration
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // server.ext('onPreResponse', (request, h) => {
  //   // Mendapatkan konteks response dari request
  //   const { response } = request;
  //
  //   if (response instanceof Error) {
  //     // Penanganan client error secara internal.
  //     if (response instanceof ClientError) {
  //       const newResponse = h.response({
  //         status: 'fail',
  //         message: response.message,
  //       });
  //       newResponse.code(response.statusCode);
  //       return newResponse;
  //     }
  //
  //     // Mempertahankan penanganan client error oleh hapi secara native, seperti 404,etc.
  //     if (!response.isServer) {
  //       return h.continue;
  //     }
  //
  //     // Penanganan server error sesuai kebutuhan
  //     const newResponse = h.response({
  //       status: 'error',
  //       message: 'terjadi kegagalan pada server kami',
  //     });
  //     newResponse.code(500);
  //     return newResponse;
  //   }
  //   // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
  //   return h.continue;
  // });

  await server.register({
    plugin: albums,
    options: {
      service: albumsService,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
