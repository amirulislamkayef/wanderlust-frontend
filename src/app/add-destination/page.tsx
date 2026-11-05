"use client";

import { useState } from "react";
import { Save, Trash2 } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const headingFont = Playfair_Display({
    subsets: ["latin"],
    display: "swap",
});

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"];

const initialForm = {
    name: "",
    country: "",
    price: "",
    duration: "",
    departure: "",
    imageUrl: "",
    description: "",
};

export default function AddDestinationPage() {
    const [form, setForm] = useState(initialForm);
    const [category, setCategory] = useState<string>("Beach");
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setSubmitted(false);
    };

    const handleReset = () => {
        setForm(initialForm);
        setCategory("Beach");
        setSubmitted(false);
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const {data,error} = await authClient.token()
        const token = data?.token

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-destination`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body:JSON.stringify(form)
        })

        const result = await res.json()
        console.log(result);
        
        setSubmitted(true);
        // console.log(form);
        
    };

    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-16">
            <h1
                className={`${headingFont.className} text-4xl font-bold text-gray-900 md:text-5xl`}
            >
                Add New Travel Package
            </h1>

            <Card className="mx-auto mt-12 w-full max-w-xl py-8">
                <CardContent className="px-8">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <Field>
                            <FieldLabel htmlFor="name">Destination Name</FieldLabel>
                            <Input
                                id="name"
                                name="name"
                                required
                                placeholder="Bali Paradise"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </Field>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field>
                                <FieldLabel htmlFor="country">Country</FieldLabel>
                                <Input
                                    id="country"
                                    name="country"
                                    required
                                    placeholder="Indonesia"
                                    value={form.country}
                                    onChange={handleChange}
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="category">Category</FieldLabel>
                                <Select
                                    value={category}
                                    onValueChange={(value) => setCategory(value ?? "Beach")}
                                >
                                    <SelectTrigger id="category" className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            categories.map((item) => (
                                                <SelectItem key={item} value={item}>
                                                    {item}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </Field>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field>
                                <FieldLabel htmlFor="price">Price (USD)</FieldLabel>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    min="0"
                                    required
                                    placeholder="e.g., 1299"
                                    value={form.price}
                                    onChange={handleChange}
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="duration">Duration</FieldLabel>
                                <Input
                                    id="duration"
                                    name="duration"
                                    required
                                    placeholder="e.g., 7 Days/6 Nights"
                                    value={form.duration}
                                    onChange={handleChange}
                                />
                            </Field>
                        </div>

                        <Field>
                            <FieldLabel htmlFor="departure">Departure Date</FieldLabel>
                            <Input
                                id="departure"
                                name="departure"
                                type="date"
                                required
                                value={form.departure}
                                onChange={handleChange}
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="imageUrl">Image URL</FieldLabel>
                            <Input
                                id="imageUrl"
                                name="imageUrl"
                                type="url"
                                placeholder="https://example.com/image.jpg"
                                value={form.imageUrl}
                                onChange={handleChange}
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="description">Description</FieldLabel>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Describe the travel experience..."
                                className="min-h-32"
                                value={form.description}
                                onChange={handleChange}
                            />
                        </Field>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            {submitted && (
                                <p className="mr-auto text-sm text-green-600">
                                    Travel package added successfully.
                                </p>
                            )}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleReset}
                                className="h-10 gap-2 border-red-200 bg-red-50 px-4 text-red-500 hover:bg-red-100 hover:text-red-600"
                            >
                                <Trash2 className="size-4" />
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="h-10 gap-2 bg-[#0097b2] px-4 text-white hover:bg-[#007d95]"
                            >
                                <Save className="size-4" />
                                Add Travel Package
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
