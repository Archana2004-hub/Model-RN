# FreshCart - React Native (Expo) - MCA Sem III Model Exam (navy + orange redesign)

## Requirements
- Node.js 18+ (node -v)
- Expo Go app on your phone (same Wi-Fi) OR an Android emulator

## Run
```
cd GroceryApp
npm install
npx expo install --fix      # aligns package versions with your Expo SDK
npx expo start -c
```
Scan the QR code with Expo Go (Android) / Camera (iOS). Press `a` for Android emulator, `w` for web.

Project uses Expo SDK 57. If your Expo Go is a different SDK: `npx expo install expo@^<SDK> --fix` (or install the matching Expo Go version).

## Demo logins
- Customer: user@shop.com / user123  (or Sign Up)
- Admin: admin@shop.com / admin123  (or Sign Up)

## Marks mapping
| Requirement | File |
|---|---|
| Home (Sign up / Sign in, Admin & Customer) | src/screens/HomeScreen.js, AuthScreen.js |
| Products list (both) | src/screens/ProductsScreen.js, components/ProductList.js |
| Profile + Edit Profile (customer) | ProfileScreen.js, EditProfileScreen.js |
| Favorites (customer) | FavoritesScreen.js |
| Product details (customer) | ProductDetailsScreen.js |
| Cart (both) | CartScreen.js |
| Stack / Tabs / Drawer | src/navigation/index.js |
| Add single/multiple to cart, +/- qty | components/ProductList.js, CartScreen.js, context/AppContext.js |
| Validation | AuthScreen.js, EditProfileScreen.js |

Note: Figma link could not be opened here; adjust colors/spacing in src/theme.js to match your Figma (green #53B175 grocery style used).

## Product images
Images are in `assets/products/` (256x256 PNG, Microsoft Fluent Emoji 3D, MIT licence) and are loaded in `src/data/products.js`.
To use your own photos, replace the PNG files with the same names (or change the `require(...)` paths).
