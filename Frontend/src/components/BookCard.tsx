import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BookCardProps {
  title: string;
  description: string;
  author: string;
  genre: string;
  coverImage: string;
  bookPDF: string;
  onClick: () => void; // New prop for click handler
}

export function BookCard({
  title,
  description,
  author,
  genre,
  coverImage,
  onClick,
}: BookCardProps) {
  return (
    <Card
      className="w-full max-w-xs mx-auto p-0 cursor-pointer hover:shadow-lg transition"
      onClick={onClick} // Use the onClick handler
    >
      <CardHeader className="items-center">
        <div className="relative w-40">
          <img
            src={coverImage}
            alt={`Cover of ${title}`}
            className="object-cover rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="mb-2 text-sm line-clamp-1">{title}</CardTitle>
        <p className="text-xs text-muted-foreground mb-2">by {author}</p>
        <p className="text-xs text-muted-foreground mb-4">Genre: {genre}</p>
        <p className="text-xs line-clamp-2 mb-4">
          {description.split(" ").slice(0, 55).join(" ")}
          {description.split(" ").length > 55 ? "..." : ""}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <Book className="mr-2 h-4 w-4" />
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
}

