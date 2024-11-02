import connectDB from "../../../../../config/db";
import NewsItem from "../../../../../models/NewsItem";



export async function GET(_request: Request, { params }: { params: { id: string } }) {

    connectDB();
    try {
        const item = await NewsItem.findById(params.id).select('-__v');
        return Response.json(item);
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Item not found.2 ' }),
            { status: 404 }
        )
    }
}