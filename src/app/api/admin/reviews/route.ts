import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { prisma } from "@/server/db";

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const reviewId = searchParams.get("id");

    if (!reviewId) {
      return new NextResponse("Review ID is required", { status: 400 });
    }

    await prisma.review.delete({
      where: {
        id: reviewId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[REVIEW_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
