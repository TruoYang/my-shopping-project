'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::user-cart.user-cart', ({ strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body;

    // Lấy slug
    const slug = data.products.connect[0];

    // Tìm sản phẩm theo slug
    const productEntry = await strapi.entityService.findMany('api::product.product', {
      filters: { slug },
      limit: 1,
    });

    if (!productEntry || productEntry.length === 0) {
      return ctx.badRequest('Sản phẩm không tồn tại với slug đã cung cấp.');
    }

    const productId = productEntry[0].id;

    // Gán lại ID thay vì slug
    data.products.connect = [{ id: productId }];

    // Gọi hàm create mặc định của Strapi
    const response = await super.create(ctx);

    return response;
  },
  async deleteBySlug(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.db.query('api::user-cart.user-cart').findOne({
      where: { cartSlug: slug },
    });

    if (!entity) {
      return ctx.notFound('Cart not found');
    }

    await strapi.db.query('api::user-cart.user-cart').delete({
      where: { id: entity.id },
    });

    ctx.send({ message: 'Deleted successfully' });
  }
}));
