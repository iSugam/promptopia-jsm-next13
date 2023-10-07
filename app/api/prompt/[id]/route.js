import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (to read)
export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate("creator");

        if(!prompt) return new Response("Prompt not found", { status: 404 })
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch any promts", { status: 500 })
    }
};

// PATCH (to update)
export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();

    try {
        await connectToDB();
        const existingPrompt = await findById( params.id );

        if(!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the prompt", { status: 200 });
    } catch (error) {
        return new Response(error, { status: 500 })
    }
};

// DELETE (to delete)
export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id);
        new Response("Prompt deleted successfully", { status: 200} )
    } catch (error) {
        return new Response("Failed to delete prompt", { status: 500 })
    }
};