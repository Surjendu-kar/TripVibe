import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import userSchema from "@/lib/schema/schema";

export async function GET() {
  await dbConnect();
  try {
    const data = await userSchema.find();


    // Convert image data to base64 string
    const formattedData = data.map((item) => ({
      ...item.toObject(),
      image: item.image
        ? {
            ...item.image,
            data: item.image.data.toString("base64"),
          }
        : null,
      activities: item.activities || [],
    }));

    return NextResponse.json({ result: formattedData, success: true });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({
      error: "An error occurred while fetching data ",
      error,
      success: false,
    });
  }
}

export async function POST(request) {
  const payload = await request.json();
  await dbConnect();
  try {
    // If the image data is a base64 string, you need to convert it to a Buffer
    if (payload.image && payload.image.data) {
      const base64Data = payload.image.data.split(",")[1];
      payload.image.data = Buffer.from(base64Data, "base64");
    }

    let newUser = new userSchema(payload);
    const data = await newUser.save();
    console.log(data);
    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({
      error: "An error occurred while saving data ",
      error,
      success: false,
    });
  }
}

export async function PUT(request) {
  const payload = await request.json();
  await dbConnect();
  try {
    const { _id, activities, ...updateData } = payload;

    // If the image data is a base64 string, convert it to a Buffer
    if (updateData.image && updateData.image.data) {
      const base64Data = updateData.image.data.split(",")[1];
      updateData.image.data = Buffer.from(base64Data, "base64");
    }

    const updatedUser = await userSchema.findByIdAndUpdate(
      _id,
      { $set: { ...updateData, activities: activities } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: updatedUser, success: true });
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json(
      {
        error: "An error occurred while updating data",
        errorDetails: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const payload = await request.json();
  await dbConnect();
  try {
    const { _id, activityId } = payload;

    const updatedUser = await userSchema.findByIdAndUpdate(
      _id,
      { $pull: { activities: { _id: activityId } } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User or activity not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: updatedUser, success: true });
  } catch (error) {
    console.error("Error deleting activity:", error);
    return NextResponse.json(
      {
        error: "An error occurred while deleting the activity",
        errorDetails: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
