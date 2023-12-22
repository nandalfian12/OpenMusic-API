class AlbumsHandler {
  constructor(service) {
    this.service = service;
  }

  async postAlbumHandler(request, h) {
    const { name, year } = request.payload;

    const albumId = await this.service.addAlbum({
      name,
      year,
    });

    const response = h.response({
      status: 'success',
      message: 'Menambahkan album',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  async getAlbumByIdHandler(request) {
    const { id } = request.params;

    const album = await this.service.getAlbumById(id);
    return {
      status: 'success',
      data: {
        album,
      },
    };
  }

  async putAlbumByIdHandler(request) {
    const { id } = request.params;

    await this.service.editAlbumById(id, request.payload);

    return {
      status: 'success',
      message: 'Album berhasil diperbarui',
    };
  }

  async deleteAlbumByIdHandler(request) {
    const { id } = request.params;

    await this.service.deleteAlbumById(id);

    return {
      status: 'success',
      message: 'Album berhasil dihapus',
    };
  }
}

module.exports = AlbumsHandler;
