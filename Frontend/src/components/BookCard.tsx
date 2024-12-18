import { Book, Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface BookCardProps {
  title: string
  description: string
  author: string
  genre: string
  coverImage: string
  bookPDF: string
}

export function BookCard({ title, description, author, genre, coverImage, bookPDF }: BookCardProps) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className='items-center'>
        <div className="relative w-40 ">
          <img
            src={coverImage}
            alt={`Cover of ${title}`}
            className="object-cover rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="mb-2 line-clamp-1">{title}</CardTitle>
        <p className="text-sm text-muted-foreground mb-2">by {author}</p>
        <p className="text-sm text-muted-foreground mb-4">Genre: {genre}</p>
        <p className="text-sm line-clamp-3 mb-4">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <Book className="mr-2 h-4 w-4" />
          Read More
        </Button>
        <Button variant="secondary" size="sm" asChild>
          <a href={bookPDF} download>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
