import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { prisma } from "@/server/db";

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");
    const body = await request.json();
    const { name, email, isAdmin } = body;

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
        isAdmin,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[USER_UPDATE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[USER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
