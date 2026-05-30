# TODO: Fix Women Products Display Issue

## Approved Plan Steps:
1. [x] Edit backend/index.js: Normalize category to lowercase in /addproduct endpoint.
2. [x] Edit admin/src/components/AddProduct.jsx: Set default category to "women" (lowercase).
3. [x] Edit Frontend/src/Pages/Category.jsx: Make category filter case-insensitive.
4. [x] Restart backend server (execute: cd backend && node index.js).
5. [ ] Test: Add new women product via admin, visit frontend /womens page, verify display.
6. [ ] Verify via browser: http://localhost:4000/allproducts shows correct category casing.

Progress: Starting step 1.
