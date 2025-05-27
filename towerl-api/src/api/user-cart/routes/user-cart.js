const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = {
  routes: [
    // Route mặc định của core
    {
      method: 'GET',
      path: '/user-carts',
      handler: 'user-cart.find',
      config: { policies: [] },
    },
    {
      method: 'GET',
      path: '/user-carts/:id',
      handler: 'user-cart.findOne',
      config: { policies: [] },
    },
    {
      method: 'POST',
      path: '/user-carts',
      handler: 'user-cart.create',
      config: { policies: [] },
    },
    {
      method: 'PUT',
      path: '/user-carts/:id',
      handler: 'user-cart.update',
      config: { policies: [] },
    },
    {
      method: 'DELETE',
      path: '/user-carts/:id',
      handler: 'user-cart.delete',
      config: { policies: [] },
    },

    // Route tùy chỉnh: xóa theo slug
    {
      method: 'DELETE',
      path: '/user-carts/slug/:slug',
      handler: 'user-cart.deleteBySlug',
      config: { policies: [] },
    },
  ],
};
