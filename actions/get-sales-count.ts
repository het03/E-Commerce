import primsadb from "@/lib/prismadb";

export const getSalesCount = async (storeId: string) => {
    const salesCount = await primsadb.order.count({
        where: {
            storeId,
            isPaid: true
        },
    });

    return salesCount;
}