# E-Commerce Application
This application represents a simple e-commerce application that allows you to search for food items, add them to cart, and checkout.

## Project Information
> **BUGS**
>
> * ~~[!!!] If you add the same item from categories then from view all, it treats it as two separate items~~
> ~~-> Recreate: (1) Add a few items to bag a few times then add "Soda" to bag (2) Update quantity of items (3) Remove an item from bag (4) Add "Soda" from "View All" page~~
> * ~~[!!!] Remove from cart then will add to cart instead~~
> * [!!!] Cart displays "-0.00" as price if the last item is removed
> * [!!] User can add more than 20 of one item to cart
> * [!] Cart with number badge needs to be turned into a div so both can be clicked

### Current Features
- Display food items
- Display food items as a list of categories
- Search for specific food items
- Add items to cart
- Remove items from cart
- Update quantity of item in cart
- Navigate between home, menu, and cart
- View promotions on homepage
- Route to checkout page from cart

### Current Fixes
- Organize cart related methods into `Cart.tsx` component
- Remove from cart unorganized and buggy

### Features to add
- Purchasing and Checkout
- Routing
    - Promos
- Style / CSS Changes (make it look less 2000 more 2024)
- Promotions (e.g. Buy one get one free tacos, free fries with burger, etc.)
- Implement larger JSON file
