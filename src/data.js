const diet_type = [
  { value: 'balanced', label: 'Balanced' },
  { value: 'high-fiber', label: 'High-Fiber' },
  { value: 'high-protein', label: 'High-Protein' },
  { value: 'low-carb', label: 'Low-Carb' },
  { value: 'low-fat', label: 'Low-Fat' },
  { value: 'low-sodium', label: 'Low-Sodium' }
]

const health_restrictions = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'dairy-free', label: 'Dairy' },
  { value: 'egg-free', label: 'Eggs' },
  { value: 'fish-free', label: 'Fish' },
  { value: 'gluten-free', label: 'Gluten' },
  { value: 'peanut-free', label: 'Peanuts' },
  { value: 'shellfish-free', label: 'Shellfish' },
  { value: 'soy-free', label: 'Soy' },
  { value: 'tree-nut-free', label: 'Tree Nuts' },
  { value: 'kosher', label: 'Kosher' },
  { value: 'keto-friendly', label: 'Keto' },
  { value: 'paleo', label: 'Paleo' }
]

const meal_type = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'snack', label: 'Snack' }
]

const dish_type = [
  { value: 'main-course', label: 'Main Course' },
  { value: 'starter', label: 'Starter' },
  { value: 'soup', label: 'Soup' },
  { value: 'salad', label: 'Salad' },
  { value: 'sandwich', label: 'Sandwich' },
  { value: 'desserts', label: 'Desserts' },
  { value: 'drinks', label: 'Drinks' },
  { value: 'alcohol-cocktail', label: 'Alcohol-cocktail' }
]

const cuisine_type = [
  { value: 'american', label: 'American' },
  { value: 'italian', label: 'Italian' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'indian', label: 'Indian' },
  { value: 'carribean', label: 'Carribean'},
  { value: 'french', label: 'French' },
  { value: 'mexican', label: 'Mexican' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'mediterranean', label: 'Mediterranean' }
]

module.exports = {
diet_type,
health_restrictions,
meal_type,
dish_type,
cuisine_type
} 


