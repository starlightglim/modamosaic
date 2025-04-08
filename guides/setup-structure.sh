#!/bin/bash

# ModaMosaic Project Structure Setup Script
# This script sets up the directory structure for the ModaMosaic multi-creator marketplace

echo "Setting up ModaMosaic directory structure..."

# Create component directories
echo "Creating component directories..."
mkdir -p app/components/global
mkdir -p app/components/product
mkdir -p app/components/ui

# Move existing components to appropriate directories
echo "Organizing existing components..."

# Global components
if [ -f app/components/Header.tsx ]; then
  mv app/components/Header.tsx app/components/global/
fi

if [ -f app/components/Footer.tsx ]; then
  mv app/components/Footer.tsx app/components/global/
fi

if [ -f app/components/PageLayout.tsx ]; then
  mv app/components/PageLayout.tsx app/components/global/
fi

if [ -f app/components/Aside.tsx ]; then
  mv app/components/Aside.tsx app/components/global/
fi

# Product components
if [ -f app/components/ProductForm.tsx ]; then
  mv app/components/ProductForm.tsx app/components/product/
fi

if [ -f app/components/ProductImage.tsx ]; then
  mv app/components/ProductImage.tsx app/components/product/
fi

if [ -f app/components/ProductPrice.tsx ]; then
  mv app/components/ProductPrice.tsx app/components/product/
fi

if [ -f app/components/AddToCartButton.tsx ]; then
  mv app/components/AddToCartButton.tsx app/components/product/
fi

if [ -f app/components/CartLineItem.tsx ]; then
  mv app/components/CartLineItem.tsx app/components/product/
fi

if [ -f app/components/CartMain.tsx ]; then
  mv app/components/CartMain.tsx app/components/product/
fi

if [ -f app/components/CartSummary.tsx ]; then
  mv app/components/CartSummary.tsx app/components/product/
fi

# Create UI component placeholders
echo "Creating UI component placeholders..."
touch app/components/ui/Button.tsx
touch app/components/ui/Card.tsx
touch app/components/ui/Modal.tsx

# Create creators directory structure
echo "Setting up creators directory structure..."
mkdir -p app/creators/creator1/components
mkdir -p app/creators/creator1/styles
mkdir -p app/creators/creator1/assets

mkdir -p app/creators/creator2/components
mkdir -p app/creators/creator2/styles
mkdir -p app/creators/creator2/assets

# Create creator routes
echo "Setting up creator routes..."
mkdir -p app/routes/creators
touch app/routes/creators/_index.tsx
touch app/routes/creators/[handle].tsx
mkdir -p app/routes/creators/[handle]/collections
touch app/routes/creators/[handle]/collections/_index.tsx
touch app/routes/creators/[handle]/collections/[collectionHandle].tsx
mkdir -p app/routes/creators/[handle]/products
touch app/routes/creators/[handle]/products/[productHandle].tsx

# Create creator configuration
echo "Setting up creator configuration utilities..."
mkdir -p app/lib/creators
touch app/lib/creators/config.ts
touch app/lib/creators/types.ts
touch app/lib/creators/hooks.ts
touch app/lib/creators/api.ts

# Set up public directory structure
echo "Setting up public directory structure..."
mkdir -p public/fonts
mkdir -p public/images
mkdir -p public/shared-assets
mkdir -p public/creators/creator1
mkdir -p public/creators/creator2

echo "ModaMosaic directory structure setup complete!"
echo "Next steps:"
echo "1. Implement creator configuration in app/lib/creators/config.ts"
echo "2. Create base UI components in app/components/ui/"
echo "3. Implement creator routes starting with app/routes/creators/_index.tsx" 