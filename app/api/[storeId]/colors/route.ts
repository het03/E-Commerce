import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import primsadb from "@/lib/prismadb";

export async function POST(
    req: Request,
    { params }: { params : { storeId: string  } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if(!value) {
        return new NextResponse("Value is required", { status: 400 });
      }

    if(!params.storeId) {
    return new NextResponse("Store ID is required", { status: 400 })
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

    const color = await primsadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLORS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
    req: Request,
    { params }: { params : { storeId: string  } }
) {
  try {

    if(!params.storeId) {
    return new NextResponse("Store ID is required", { status: 400 })
    }

    const colors = await primsadb.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLORS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}