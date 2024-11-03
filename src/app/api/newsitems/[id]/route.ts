// src/app/api/newsitems/[id]/route.ts

import { NextResponse } from 'next/server';
import connectDB from "../../../../../config/db";
import NewsItem from "../../../../../models/NewsItem";


export async function GET(_request: Request, { params }: { params: { id: string } }) {
   
    await connectDB();

    try {

        const { id } = await params; // Await params here to avoid sync access error

        const item = await NewsItem.findById(id).select('-__v'); // Access id after awaiting

        if (!item) {
            return NextResponse.json({ message: 'News item not found' }, { status: 404 });
        }

        return Response.json(item);

    } catch (error) {

        console.error('Error fetching news item:', error);

        return NextResponse.json({ message: 'Error fetching news item' }, { status: 500 });
    }
}