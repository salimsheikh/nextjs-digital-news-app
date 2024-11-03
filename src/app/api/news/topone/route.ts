import connectDB from "../../../../../config/db";
import NewsItem from "../../../../../models/NewsItem";

// Handler for GET requests to fetch all news items
export async function GET() {

    await connectDB();

    try {
        // Fetches all news items, excluding the __v field
        const newsitem = await NewsItem.findOne({ top: true }).sort({ createdAt: 1 });        

        // Returns the fetched news items as a JSON response
        if (!newsitem) {            
            return new Response(
                JSON.stringify({ message: 'Item not found.' }),
                { status: 404 }
            )
        }else{
            // Returns a JSON response with the newly created item and a 201 status code
            return new Response(JSON.stringify(newsitem), {
                headers: {
                'Content-Type': 'application/json', // Specifies JSON content type
                },
                status: 200, // HTTP status code for successful found
            });
        }
    } catch (error) {
        console.error("Error fetching data:", error);       

        return new Response(
            JSON.stringify({ message: 'Server error.' }),
            { status: 500 }
        )
    }

    
}