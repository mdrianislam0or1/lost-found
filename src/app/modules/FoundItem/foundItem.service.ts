import { FoundItem, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { FoundItemsOptions, FoundItemsResponse } from "./foundItem.inteface";
const createFoundItemCategory = async (name: string) => {
  const foundItemCategory = await prisma.foundItemCategory.create({
    data: {
      name,
    },
  });
  return foundItemCategory;
};

const reportFoundItem = async (
  userId: string,
  categoryId: string,
  foundItemName: string,
  description: string,
  location: string
) => {
  const foundItem = await prisma.foundItem.create({
    data: {
      userId,
      categoryId,
      foundItemName,
      description,
      location,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return foundItem;
};

const getFoundItems = async (
  options: FoundItemsOptions
): Promise<FoundItemsResponse> => {
  const { searchTerm, page, limit, sortBy, sortOrder, foundItemName } = options;

  const { skip, take } = calculatePagination({ page, limit });

  const queryOptions: any = {
    where: {
      OR: [
        { foundItemName: { contains: searchTerm || "", mode: "insensitive" } },
        { location: { contains: searchTerm || "", mode: "insensitive" } },
        { description: { contains: searchTerm || "", mode: "insensitive" } },
      ],
    },
    include: {
      user: true,
      category: true,
    },
    orderBy: {
      [sortBy || "createdAt"]: sortOrder === "asc" ? "asc" : "desc",
    },
    skip,
    take,
  };

  if (foundItemName) {
    queryOptions.where.foundItemName = {
      contains: foundItemName,
      mode: "insensitive",
    };
  }

  try {
    const foundItems = await prisma.foundItem.findMany(queryOptions);
    const total = await prisma.foundItem.count({ where: queryOptions.where });

    return {
      success: true,
      statusCode: 200,
      message: "Found items retrieved successfully",
      meta: {
        total,
        page: page || 1,
        limit: take,
      },
      data: foundItems,
    };
  } catch (error: any) {
    throw new Error(`Error fetching found items: ${error.message}`);
  }
};

const calculatePagination = (options: { page?: number; limit?: number }) => {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;

  return { skip, take: limit };
};

export const FoundItemServices = {
  createFoundItemCategory,
  reportFoundItem,
  getFoundItems,
};
