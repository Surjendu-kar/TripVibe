import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import userSchema from "@/lib/schema/schema";

export async function GET(request) {
  await dbConnect();
  try {
    const data = await userSchema.find();
    // console.log(data);
    return NextResponse.json({ result: data, success: true });
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
  const payload = await request.json(); //convert the req into json format
  await dbConnect();
  try {
    let newUser = new userSchema(payload);
    const data = await newUser.save();
    console.log(data);
    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({
      error: "An error occurred while fetching data ",
      error,
      success: false,
    });
  }
}
