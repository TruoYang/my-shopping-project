const { default: axios } = require('axios');
const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api'
})

const getCategory = () =>
    axiosClient.get('/categories?populate=*&sort=order:asc');

const getSlider = () => axiosClient.get('/sliders?populate=*')
    .then(
        resp => {
            return resp.data.data
        }
    )

const getCategoryList = () => axiosClient.get('/categories?populate=*')
    .then(
        resp => {
            return resp.data.data
        }
    )

const getProductList = () => axiosClient.get('/products?populate=*&sort=numberOfProductPurchased:desc')
    .then(
        resp => {
            console.log("Product List:", resp.data.data)
            return resp.data.data
        }
    )

const getProductListByCategory = (category) =>
    axiosClient.get('/products?filters[categories][name][$in]=' + encodeURIComponent(category) + '&populate=*')
        .then(resp => {
            console.log("Product List By Category:", resp.data.data)
            return resp.data.data
        });

// http://localhost:1337/api/products?filters[slug][$eq]=khan-trai-ban-fu-xas-mau-5
// http://localhost:1337/api/products?filters[slug][$eq]=khan-trai-ban-fu-xas-mau-5&populate=categories
const getProductDetailBySlug = (slug) =>
    axiosClient.get(
        '/products?filters[slug][$eq]=' +
        encodeURIComponent(slug) +
        '&populate=images' +
        '&populate=categories')
        .then(resp => {
            console.log("Product Detailt here we go:", resp.data)
            return resp.data.data
        });

const getProductsByCategoryId = (categoryId) =>
    axiosClient.get(
        `/products?filters[categories][id][$eq]=${categoryId}&populate=images`
    ).then(res => res.data.data);

// const registerInformation
const postRegisterInformation = (username, email, password) =>
    axiosClient.post(
        '/auth/local/register', {
        username: username,
        email: email,
        password: password
    }
    )

const postSigninInformation = (email, password) =>
    axiosClient.post(
        '/auth/local', {
        identifier: email,
        password: password
    }
    )

const getInformationByUserId = (userId) => {
    axiosClient.get(
        '/'
    )
}

const updateUserName = (userId, name, token) => {
    return axiosClient.put(
        `/users/${userId}`,
        { name },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

const getUserInfo = (jwt) =>
    axiosClient.get('/users/me', {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });

const addToCart = (data, jwt) => axiosClient.post('/user-carts', data, {
    headers: {
        Authorization: 'Bearer ' + jwt
    }
})
async function deleteCartItemBySlug(cartSlug, jwt) {
  return axios.delete(`http://localhost:1337/api/user-carts/slug/${cartSlug}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    }
  });
}



const getCartItems = (userId, jwt) => 
  axiosClient.get(
    '/user-carts?filters[userId][$eq]=' + userId + '&populate[products][populate]=images', 
    {
      headers: {
        Authorization: 'Bearer ' + jwt
      }
    }
  )
  .then(resp => {
    const data = resp.data.data;

    if (!Array.isArray(data)) {
      // Nếu data không phải mảng, trả về mảng rỗng hoặc throw lỗi
      return [];
    }
    console.log ("Cart Items:", data);
    const cartItemsList = data.map((item) => {
      const product = item.products?.[0];
      const imageUrl = product?.images?.[0]?.url;

      return {
        id: item.id,
        cartSlug: item.cartSlug, // bạn nên bật lại nếu dùng trong component
        name: product?.name || 'Không có tên',
        quantity: item.quantity || 0,
        amount: item.amount || 0,
        image: imageUrl ? 
            process.env.NEXT_PUBLIC_BACKEND_URL + imageUrl : '/placeholder.png',
        actualPrice: product?.sellingPrice || product?.price || 0,
      };
    }).filter(item => item != null);

    return cartItemsList;
  })
  .catch(err => {
    console.error('Lỗi khi lấy giỏ hàng:', err);
    return [];
  });




const getProductBySlug = async (slug) => {
    const res = await axiosClient.get(
        `/products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
    );
    console.log("DEBUG API Response", res.data);
    const product = res?.data?.data?.[0]; // ✅ Lấy phần tử đầu tiên trong danh sách
    return product ?? null;
};

const createOrder = (data, jwt) => axiosClient.post('/orders',data,{
    headers: {
        Authorization: 'Bearer ' + jwt
    }

})


export default {
    getCategory,
    getSlider,
    getCategoryList,
    getProductList,
    getProductListByCategory,
    getProductDetailBySlug,
    getProductsByCategoryId,
    postRegisterInformation,
    postSigninInformation,
    updateUserName,
    getUserInfo,
    addToCart,
    getProductBySlug,
    getCartItems,
    deleteCartItemBySlug,
    getInformationByUserId,
    createOrder
}