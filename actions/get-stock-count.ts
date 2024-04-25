import primsadb from "@/lib/prismadb";

export const getStockCount = async (storeId: string) => {
    const stockCount = await primsadb.product.count({
        where: {
            storeId,
            isArchived: false,
        },
    });

    return stockCount;
};