import React from "react";
import Link from "next/link";

import { db } from "@/lib/db";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { auth } from "@clerk/nextjs";

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const { userId } = auth();
  const res = await db.course.findMany({
    where: {
      categoryId: params.categoryId,
    },
    include: {
      category: true,
      chapters: true,
      purchases: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  const categoryName = res.find((data) => data.category?.name);
  const purchaseInfo = res.find((data) =>
    data.purchases.find((purchase) => purchase.userId === userId)
  );

  return (
    <div className="w-full h-auto min-h-screen p-10">
      <Link
        href={`/main`}
        className="flex items-center text-sm hover:opacity-75 transition mb-6 ml-10 w-fit"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>
      <div>
        <h1 className="text-3xl font-extrabold">
          {categoryName?.category?.name} Course
        </h1>
        <div className="flex flex-row flex-wrap gap-2 justify-start items-center mt-10">
          {res.map((item, index) => (
            <Link href={`/course/${item.id}`} key={item.id}>
              <Card
                shadow="sm"
                key={index}
                isPressable
                className="border dark:border-0"
              >
                <CardBody className="overflow-visible p-2 w-64">
                  <Image
                    shadow="sm"
                    radius="lg"
                    alt={item.title}
                    className="w-[280px] object-cover h-[230px]"
                    src={item.imageUrl ?? ""}
                  />
                </CardBody>
                <CardFooter className="text-small flex flex-col gap-y-1 justify-start items-start">
                  <b>{item.title}</b>
                  <p className="text-default-500 italic">
                    {item.category?.name}
                  </p>
                  <div className="flex flex-row my-2 items-center justify-between w-full">
                    <div className="flex flex-row items-center space-x-3">
                      <BookOpen className="h-7 w-7 bg-green-600/20 text-green-600 p-1.5 rounded-md" />
                      <span className="text-default-500">
                        {item.chapters.length} chapters
                      </span>
                    </div>
                    <div className="flex flex-row items-center">
                      {item.price !== null && (
                        <span className="text-default-500 italic mr-2">
                          Price
                        </span>
                      )}
                      {item.price !== null ? (
                        <>
                          {purchaseInfo !== null ? (
                            <span>${item.price}</span>
                          ) : (
                            "Paid"
                          )}
                        </>
                      ) : (
                        "FREE"
                      )}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
