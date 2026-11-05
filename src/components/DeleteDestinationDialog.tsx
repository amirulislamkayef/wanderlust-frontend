"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

type DeleteDestinationDialogProps = {
    id: string;
};

const DeleteDestinationDialog = ({ id }: DeleteDestinationDialogProps) => {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDeleteDestination = async () => {
        if (deleting) return;
        setDeleting(true);
        setError(false);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                setError(true);
                return;
            }

            // Some DELETE endpoints return an empty body — don't force .json().
            // Navigate off this page: it no longer exists.
            router.push("/destinations");
            router.refresh();
        } catch {
            // Backend unreachable.
            setError(true);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger
                    render={
                        <Button
                            variant="outline"
                            className="gap-2 border-red-200 bg-red-50 px-4 text-red-500 hover:bg-red-100 hover:text-red-600"
                        />
                    }
                >
                    <Trash2 className="size-4" />
                    Delete
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this
                            travel package from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    {error && (
                        <p className="text-sm text-red-500">
                            Delete failed. Is the backend running?
                        </p>
                    )}
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteDestination}
                            disabled={deleting}
                        >
                            {deleting ? "Deleting..." : "Continue"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default DeleteDestinationDialog;
