"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { type Destination } from "@/components/destination-card";

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"];


type EditDestinationProps = {
    destination: Destination;
};

const EditDestination = ({ destination }: EditDestinationProps) => {
    const router = useRouter();
    const [form, setForm] = useState<Destination>(destination);
    const [category, setCategory] = useState<string>(
        destination.category ?? "Beach"
    );
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setStatus("idle");
    };

    // Cancel restores the original server values instead of wiping the form.
    const handleReset = () => {
        setForm(destination);
        setCategory(destination.category ?? "Beach");
        setStatus("idle");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // form is an OBJECT — use object rest to strip _id (array destructuring
        // throws "form is not iterable" and the request never fires).
        const updatedData: Partial<Destination> = { ...form };
        delete updatedData._id;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${destination._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                // category lives in separate state, so send it explicitly.
                body: JSON.stringify({ ...updatedData, category }),
            });

            if (!res.ok) {
                setStatus("error");
                return;
            }

            setStatus("success");
            // The details page is server-rendered — refresh so it re-fetches
            // the updated record instead of showing stale data.
            router.refresh();
        } catch {
            // Network failure / backend unreachable.
            setStatus("error");
        }
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger
                    render={<Button variant="outline" className="gap-2" />}
                >
                    <Pencil className="size-4" />
                    Edit
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Edit Destination</DialogTitle>
                        <DialogDescription>
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
                                    {status === "success" && (
                                        <p className="mr-auto text-sm text-green-600">
                                            Travel package updated successfully.
                                        </p>
                                    )}
                                    {status === "error" && (
                                        <p className="mr-auto text-sm text-red-500">
                                            Update failed. Is the backend running?
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
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditDestination;
