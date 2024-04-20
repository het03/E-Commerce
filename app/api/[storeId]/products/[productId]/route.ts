import primsadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET (
    req: Request,
    { params }: { params: {productId: string} }
) {
    try{
        if(!params.productId){
            return new NextResponse("Product ID is required", { status: 400 });
        }

        const product = await primsadb.product.findUnique({
            where: {
                id: params.productId,
            },
            include: {
                category: true,
                color: true,
                size: true,
                images: true,
            }
        });

        return NextResponse.json(product);
    }
    catch (error){
        console.log('[PRODUCT_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PATCH (
    req: Request,
    { params }: { params: {storeId: string, productId: string} }
) {
    try{
        const { userId } = auth();
        const body = await req.json();

        const { 
            name, 
            price, 
            categoryId, 
            colorId, 
            sizeId, 
            images, 
            isFeatured, 
            isArchived,
          } = body;

        if(!userId){
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
          }
      
          if(!images || !images.length) {
            return new NextResponse("Images are required", { status: 400 });
          }
      
          if (!price) {
            return new NextResponse("Price is required", { status: 400 });
          }
      
          if (!categoryId) {
            return new NextResponse("Category ID is required", { status: 400 });
          }
      
          if (!colorId) {
            return new NextResponse("Color ID is required", { status: 400 });
          }
      
          if (!sizeId) {
            return new NextResponse("Ssize ID is required", { status: 400 });
          }

        if(!params.productId){
            return new NextResponse("Product ID is required", { status: 400 });
        }

        const storeByUsserId = await primsadb.store.findFirst({
            where: {
              id: params.storeId,
              userId
            },
          });
      
          if(!storeByUsserId){
              return new NextResponse("Unauthorized", { status: 403 });
          }

        await primsadb.product.update({
            where: {
                id: params.productId,
            },
            data: {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                images: {
                    deleteMany: {}
                },
                isArchived,
                isFeatured,
            }
        });

        const product = await primsadb.product.update({
            where:{
                id: params.productId,
            },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: string) => ({ url: image })),
                        ]
                    },
                },
                },
        })

        return NextResponse.json(product);
    }
    catch (error){
        console.log('[PRODUCT_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};


export async function DELETE (
    req: Request,
    { params }: { params: {storeId: string, productId: string} }
) {
    try{
        const { userId } = auth();

        if(!userId){
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if(!params.productId){
            return new NextResponse("Product ID is required", { status: 400 });
        }

        const storeByUsserId = await primsadb.store.findFirst({
            where: {
              id: params.storeId,
              userId
            },
          });
      
          if(!storeByUsserId){
              return new NextResponse("Unauthorized", { status: 403 });
          }

        const product = await primsadb.product.deleteMany({
            where: {
                id: params.productId,
            },
        });

        return NextResponse.json(product);
    }
    catch (error){
        console.log('[PRODUCT_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

