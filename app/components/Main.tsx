"use client";
import { useState, useEffect } from "react";
import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

const model = new OpenAI({
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    temperature: 0.9
});


const memory = new BufferMemory();
const chain = new ConversationChain({ llm: model, memory: memory});

const categories = [
    { label: "Sepak Bola", value: "Sepak Bola"},
    { label: "Hollywod", value: "hollywod" },
    { label: "Biology", value: "biology" },
    { label: "Geography", value: "geography"}
]

const run = async (input: string)  => {
    const response = await chain.call({input: input})
    return response.response
}

const Main = () => {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [category, setCategory] = useState("");

    const askFirstQuestion =  async () => {
        const firstQuestion = await run(
            `Buatkan satu kuis pertanyaan kategori ${category}.`
        );
        setResponse(firstQuestion)
    };

    useEffect(() => {
        if(category !== ""){
            askFirstQuestion();
        }
    }, [category])

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const result = await run(
            `AI: ${response}\nYou: ${input}\nAI: Evaluasi sebuah Jawaban dan jika jawaban nya salah berikan jawaban yang benar.`
        );
        setResponse(result);
        setInput("");

    }

    return  (
        <div 
            className="container mx-auto
            p-4 w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2
        ">
            <h1 className="text-2xl font-bold mb-4">Bermain Quiz dengan Ai</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Your Answer"
                />
                <select 
                    name="" 
                    id=""
                    className="w-full p-2 border border-gray-300 rounded"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}    
                >
                    <option value="">Pilih Kategori</option>
                    {categories.map((category) => (
                        <option value={category.value} key={category.value}>
                            {category.label}
                        </option>
                    ))}
                </select>
                <button
                type="submit"
                className="w-full p-2 cursor-pointer text-white items-center rounded-md border-2
                border-black bg-[#033664] px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                 transition-all hover:translate-x-[3px]
                 hover:translate-y-[3px] hover:shadow-none"
                >
                    Submit 
                </button>

                {/* flex cursor-pointer items-center rounded-md border-2
                 border-black bg-[#033664] px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  transition-all hover:translate-x-[3px]
                  hover:translate-y-[3px] hover:shadow-none */}
            </form>
            {response && (
                <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded">
                    <p>{response}</p>
                </div>
            )}
        </div>
    )
}

export default Main;