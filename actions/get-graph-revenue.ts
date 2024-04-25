import primsadb from "@/lib/prismadb";

interface GraphData{
    name: string;
    total: number;
}

export const getGraphRevenue = async (storeId: string) => {
    const paidOrders = await primsadb.order.findMany({
        where: {
            storeId,
            isPaid: true
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });

    const monthlyRevenuew: { [key: number ]: number} = {};

    for(const order of paidOrders) {
        const month = order.createdAt.getMonth();
        let revenueForOder = 0;

        for(const item of order.orderItems) {
            revenueForOder += item.product.price;
        }

        monthlyRevenuew[month] = (monthlyRevenuew[month] || 0) + revenueForOder;
    };

    const graphData: GraphData[] = [
        {
            name: "Jan", total: 0
        },
        {
            name: "Frb", total: 0
        },
        {
            name: "Mar", total: 0
        },
        {
            name: "Apr", total: 0
        },
        {
            name: "May", total: 0
        },
        {
            name: "Jun", total: 0
        },
        {
            name: "Jul", total: 0
        },
        {
            name: "Aug", total: 0
        },
        {
            name: "Sep", total: 0
        },
        {
            name: "Oct", total: 0
        },
        {
            name: "Nov", total: 0
        },
        {
            name: "Dec", total: 0
        }
    ];

    for ( const month in monthlyRevenuew) {
        graphData[parseInt(month)].total = monthlyRevenuew[parseInt(month)];
    }

    return graphData;
};