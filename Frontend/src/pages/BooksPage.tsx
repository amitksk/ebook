import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { BookCard } from "@/components/BookCard";
import { getBooks } from "@/http/api";
import { Button } from "@/components/ui/button";

function BooksPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
    staleTime: 20000,
  });

  const navigate = useNavigate();

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">Failed to load books.</div>
    );
  }

  const books = Array.isArray(data?.data) ? data.data : [];

  return (
    <section className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6">
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
        <Link to="/books/create" className="mt-4 md:mt-0">
          <Button>
            <span className="ml-2">Add Book</span>
          </Button>
        </Link>
      </div>

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center md:text-left">Books</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book: any) => (
            <BookCard
              key={book._id}
              title={book.title}
              description={book.description}
              author={book.author}
              genre={book.genre}
              coverImage={book.coverImage}
              bookPDF={book.file}
              onClick={() => navigate(`/books/${book._id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BooksPage;
