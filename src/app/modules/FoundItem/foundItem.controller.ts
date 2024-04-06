import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../shared/sendResponse";
import { FoundItemServices } from "./foundItem.service";

const createFoundItemCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const foundItemCategory = await FoundItemServices.createFoundItemCategory(
      name
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Found item category created successfully",
      data: foundItemCategory,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

const reportFoundItem = async (req: Request, res: Response) => {
  try {
    const { categoryId, foundItemName, description, location } = req.body;
    const userId = (req as any).user.id;
    const foundItem = await FoundItemServices.reportFoundItem(
      userId,
      categoryId,
      foundItemName,
      description,
      location
    );

    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Found item reported successfully",
      data: foundItem,
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message || "Internal server error",
    });
  }
};

const getFoundItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const { searchTerm, page, limit, sortBy, sortOrder, foundItemName } =
      req.query;

    const options = {
      searchTerm: searchTerm?.toString(),
      page: Number(page),
      limit: Number(limit),
      sortBy: sortBy?.toString(),
      sortOrder: sortOrder?.toString(),
      foundItemName: foundItemName?.toString(),
    };

    const foundItems = await FoundItemServices.getFoundItems(options);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Found items retrieved successfully",
      data: foundItems,
    });
  } catch (error: any) {
    console.error("Error fetching found items:", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const FoundItemController = {
  createFoundItemCategory,
  reportFoundItem,
  getFoundItems,
};
