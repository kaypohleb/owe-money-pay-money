import { GoogleGenerativeAI, InlineDataPart } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined");
}
const genAI = new GoogleGenerativeAI(apiKey);



export async function fileToGenerativePart(file: File): Promise<InlineDataPart> {
    const base64EncodedDataPromise: Promise<string> = new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if(typeof reader.result !== "string") {
                throw new Error("Failed to read file as base64");
            }
            const splitData = reader.result.split(",");
            resolve(splitData[1]);
        };
        reader.onerror = (error) => {
            console.error(error);
        };
    });
    const base64EncodedData = await base64EncodedDataPromise;
    
    return {
        inlineData: { data: base64EncodedData, mimeType: file.type },
    };
}


export async function runOCRish(file: File) {
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = 'Given this image of a transactional receipt: find and retrieve all items and their corresponding quantity and prices (with discounted prices if discounted) in a JSON schema of {"items": [{"name":str, "price":number,"quantity": number}]}';
  
    const imagePart: InlineDataPart = await fileToGenerativePart(file)

    //return imagePart;
  
    const generatedContent = await model.generateContent([imagePart, prompt]);
    
    return generatedContent.response.text();
  }