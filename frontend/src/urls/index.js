const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1'

// restaurantsに対してのURL
export const restaurantsIndex = `${DEFAULT_API_LOCALHOST}/restaurants`

// restaurants/:restaurantId/foodsに対してのURL
// 引数として1つrestaurantIdを受け取る必要あり
export const foodsIndex = (restaurantId) =>
  `${DEFAULT_API_LOCALHOST}/restaurants/${restaurantId}/foods`

// line_foodsに対してのURL
export const lineFoods = `${DEFAULT_API_LOCALHOST}/line_foods`;

// line_foods/replaceに対してのURL
export const lineFoodsReplace = `${DEFAULT_API_LOCALHOST}/line_foods/replace`;

// ordersに対してのURL
export const orders = `${DEFAULT_API_LOCALHOST}/orders`;