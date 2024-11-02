import connectDB from "../../../../config/db"; // Imports the database connection function
import NewsItem from "../../../../models/NewsItem"; // Imports the NewsItem model

// API route file: src/app/api/newsitem/route.ts

// Establish MongoDB connection
connectDB();

// Handler for GET requests to fetch all news items
export async function GET() {
  // Fetches all news items, excluding the __v field
  const newsitems = await NewsItem.find().select('-__v');
  // Returns the fetched news items as a JSON response
  return Response.json(newsitems);
}

// Handler for POST requests to add a new news item
export async function POST(request: Request) {
  // Parses the JSON body from the request
  const newsitem = await request.json();

  try {
    // Creates and saves a new NewsItem document with the provided data
    const saveditem = await new NewsItem({ ...newsitem }).save();

    // Returns a JSON response with the newly created item and a 201 status code
    return new Response(JSON.stringify(saveditem), {
      headers: {
        'Content-Type': 'application/json', // Specifies JSON content type
      },
      status: 201, // HTTP status code for successful creation
    });
  } catch (error) {
    // Returns a JSON response with an error message and a 500 status code on failure
    return new Response(JSON.stringify({ message: 'SERVER ERROR' }), {
      status: 500, // HTTP status code for server error
    });
  }
}
