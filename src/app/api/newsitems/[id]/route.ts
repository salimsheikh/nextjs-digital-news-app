// src/app/api/newsitems/[id]/route.ts

import { NextResponse } from 'next/server';
import connectDB from "../../../../../config/db"; // Import database connection
import NewsItem from "../../../../../models/NewsItem"; // Import NewsItem model

// Handler for GET request to retrieve a single news item by ID
export async function GET(_request: Request, { params }: { params: { id: string } }) {

    // Establish database connection
    await connectDB();

    try {
        // Destructure and access the `id` parameter from the request
        const { id } = await params;

        // Find news item by ID in the database and exclude `__v` field
        const item = await NewsItem.findById(id).select('-__v');

        // If the item is not found, respond with a 404 error
        if (!item) {
            return NextResponse.json({ message: 'News item not found' }, { status: 404 });
        }

        // Respond with the found news item in JSON format
        return Response.json(item);

    } catch (error) {
        // Log and handle any errors that occur
        console.error('Error fetching news item:', error);

        // Respond with a 500 error if an exception occurs
        return NextResponse.json({ message: 'Error fetching news item' }, { status: 500 });
    }
}

// Handler for PUT request to update a news item by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {

    // Establish database connection
    await connectDB();
    
    // Parse the JSON body of the request to get update data
    const updateItem = await request.json();

    try {
        // Destructure and access the `id` parameter from the request
        const { id } = await params;

        // Find and update the news item by ID with new data
        const newsItem = await NewsItem.findByIdAndUpdate(id, { ...updateItem });

        // If the item is not found, respond with a 404 error
        if (!newsItem) {
            return new Response(
                JSON.stringify({ message: 'Item not found' }),
                { status: 404 }
            );
        }

        // Return the updated item in JSON format with a 200 status code
        return new Response(JSON.stringify(newsItem), {
            headers: {
                'Content-Type': 'application/json', // Specify content type as JSON
            },
            status: 200, // HTTP status code for a successful update
        });

    } catch (error) {
        // Log and handle any errors that occur during the update
        console.error('Error fetching news item update:', error);

        // Respond with a 500 error if an exception occurs
        return new Response(
            JSON.stringify({ message: 'SERVER ERROR' }),
            { status: 500 }
        );
    }
}