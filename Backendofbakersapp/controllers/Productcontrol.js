import prisma from "../config/prisma.js";

// Get all products for customer app (catalog/home)
const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            where: { publicCatalog: true },
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch products" });
    }
};

// Get single product by id (for CakeDetails / product details)
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { productId: parseInt(id) },
        });
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch product" });
    }
};

// Get products by category (for CategoryProducts / category listing)
const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.query;
        const whereClause = category ? { category, publicCatalog: true } : { publicCatalog: true };
        const products = await prisma.product.findMany({
            where: whereClause,
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch products" });
    }
};

// Create/add new product (admin catalog add)
const createProduct = async (req, res) => {
    try {
        const {
            productName,
            description,
            price,
            weight,
            weightUnit,
            stockQty,
            prepTimeMinutes,
            availableSizes,
            isEggless,
            flavorProfile,
            category,
            imageUrl,
            publicCatalog,
            bestseller,
            featured,
            allowCustomMessage,
        } = req.body;

        const newProduct = await prisma.product.create({
            data: {
                productName,
                description,
                price: price ? parseFloat(price) : null,
                weight: weight ? parseFloat(weight) : null,
                weightUnit,
                stockQty: stockQty ? parseInt(stockQty) : 0,
                prepTimeMinutes: prepTimeMinutes ? parseInt(prepTimeMinutes) : null,
                availableSizes,
                isEggless: isEggless === "true" || isEggless === true,
                flavorProfile,
                category,
                imageUrl,
                publicCatalog: publicCatalog === "true" || publicCatalog === true,
                bestseller: bestseller === "true" || bestseller === true,
                featured: featured === "true" || featured === true,
                allowCustomMessage: allowCustomMessage === "true" || allowCustomMessage === true,
            },
        });
        res.status(201).json({ success: true, message: "Product created", data: newProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to create product" });
    }
};

// Update product (edit)
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (updates.price) updates.price = parseFloat(updates.price);
        if (updates.weight) updates.weight = parseFloat(updates.weight);
        if (updates.stockQty) updates.stockQty = parseInt(updates.stockQty);
        if (updates.prepTimeMinutes) updates.prepTimeMinutes = parseInt(updates.prepTimeMinutes);
        if (updates.isEggless !== undefined) updates.isEggless = updates.isEggless === "true" || updates.isEggless === true;
        if (updates.publicCatalog !== undefined) updates.publicCatalog = updates.publicCatalog === "true" || updates.publicCatalog === true;
        if (updates.bestseller !== undefined) updates.bestseller = updates.bestseller === "true" || updates.bestseller === true;
        if (updates.featured !== undefined) updates.featured = updates.featured === "true" || updates.featured === true;
        if (updates.allowCustomMessage !== undefined) updates.allowCustomMessage = updates.allowCustomMessage === "true" || updates.allowCustomMessage === true;

        const updated = await prisma.product.update({
            where: { productId: parseInt(id) },
            data: updates,
        });
        res.status(200).json({ success: true, message: "Product updated", data: updated });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to update product" });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.product.delete({ where: { productId: parseInt(id) } });
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to delete product" });
    }
};

// Search products
const searchProducts = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ success: false, message: "Query required" });
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    { productName: { contains: q, mode: "insensitive" } },
                    { description: { contains: q, mode: "insensitive" } },
                    { category: { contains: q, mode: "insensitive" } },
                    { flavorProfile: { contains: q, mode: "insensitive" } },
                ],
                publicCatalog: true,
            },
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Search failed" });
    }
};

// Toggle product availability (publicCatalog toggle for admin)
const toggleProductAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({ where: { productId: parseInt(id) } });
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        const updated = await prisma.product.update({
            where: { productId: parseInt(id) },
            data: { publicCatalog: !product.publicCatalog },
        });
        res.status(200).json({ success: true, message: "Availability updated", data: updated });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to toggle" });
    }
};

// Get all products including non-public (for admin catalog)
const getAllProductsAdmin = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch admin products" });
    }
};

export {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    toggleProductAvailability,
    getAllProductsAdmin,
};
