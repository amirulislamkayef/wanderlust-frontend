'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { type Destination } from "@/components/destination-card";

const bookingPerks = [
    "Free cancellation up to 7 days",
    "Travel insurance included",
    "24/7 customer support",
];

type BookingCardProps = {
    destination: Destination;
};

const BookingCard = ({ destination }: BookingCardProps) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [submitting, setSubmitting] = useState(false);

    const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (submitting) return;

        if (!user) {
            setStatus("error");
            return;
        }

        setStatus("idle");
        setSubmitting(true);

        const departure = (
            e.currentTarget.elements.namedItem("departure") as HTMLInputElement
        ).value;

        // Strip _id: it identifies the DESTINATION, not the new booking. Sending
        // it makes the backend reuse that id and collide on the 2nd booking.
        const updatedData: Partial<Destination> = { ...destination };
        delete updatedData._id;

        const data = {
            userName: user.name,
            email: user.email,
            image: user.image,
            ...updatedData,
            destinationId: destination._id,
            departure,
            bookingDate: new Date().toISOString(),
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
                method: "POST",
                headers: {
                    // Was 'applocation/json' — backend couldn't parse the body.
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                setStatus("error");
                return;
            }

            setStatus("success");
        } catch {
            // Backend unreachable.
            setStatus("error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <aside className="lg:sticky lg:top-24 lg:self-start">
                <Card>
                    <CardContent className="flex flex-col gap-5">
                        <div>
                            <p className="text-sm text-gray-500">Starting from</p>
                            <p className="mt-1 text-3xl font-bold text-[#0097b2]">
                                ${destination.price}
                            </p>
                            <p className="text-sm text-gray-500">per person</p>
                        </div>
                        <form className="flex flex-col gap-4" onSubmit={handleBooking}>
                            <Input
                                type="date"
                                name="departure"
                                aria-label="Departure date"
                                defaultValue={destination.departure}
                            />

                            {status === "success" && (
                                <p className="text-sm text-green-600">
                                    Booking confirmed! We&apos;ve saved your trip.
                                </p>
                            )}
                            {status === "error" && (
                                <p className="text-sm text-red-500">
                                    {user
                                        ? "Booking failed. Is the backend running?"
                                        : "Please sign in to book this trip."}
                                </p>
                            )}

                            <Button
                                type="submit"
                                disabled={submitting}
                                className="h-11 w-full gap-2 bg-[#0097b2] text-white hover:bg-[#007d95]"
                            >
                                {submitting ? "Booking..." : "Book Now"}
                                {!submitting && <ArrowRight className="size-4" />}
                            </Button>
                        </form>
                        <ul className="flex flex-col gap-2.5">
                            {bookingPerks.map((perk) => (
                                <li
                                    key={perk}
                                    className="flex items-center gap-2 text-sm text-gray-600"
                                >
                                    <Check className="size-4 text-green-600" />
                                    {perk}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </aside>
        </div>
    );
};

export default BookingCard;


