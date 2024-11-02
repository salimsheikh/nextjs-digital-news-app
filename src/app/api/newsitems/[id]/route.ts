import connectDB from "../../../../../config/db";
import NewsItem from "../../../../../models/NewsItem";

connectDB();

export async function GET(_request: Request, { params }: { params: { id: string } }) {
    try {
        const item = await NewsItem.findById(params.id).select('-__v');
        return Response.json(item);
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'No item found.' }),
            { status: 404 }
        )
    }
}