import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getBooks } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { BookCard } from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import CreateBook from "@/pages/CreateBook";

function BooksPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks, // Fetch books from the server
  });

  //console.log("Data" + JSON.stringify(data))

  // Show a loading spinner or fallback UI when data is loading
  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  // Show an error message if the API call fails
  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">Failed to load books.</div>
    );
  }

  // Ensure data is an array
  const books = Array.isArray(data?.data) ? data.data : [];

  // Map the fetched book data to `BookCard`
  return (
    <section>
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to={"/"}>Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Books</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Link to="/books/create">
          <div className="flex justify-end">
            <Button>
              <span className="ml-2">Add Book</span>
            </Button>
          </div>
        </Link>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Books</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book: any) => (
            <BookCard
              key={book._id} // Use a unique key like _id
              title={book.title}
              description={book.description}
              author={book.author}
              genre={book.genre}
              coverImage={book.coverImage}
              bookPDF={book.file} // Updated key to match API response
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BooksPage;
