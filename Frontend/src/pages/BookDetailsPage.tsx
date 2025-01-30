import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBookById, updateBookRating } from "@/http/api";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookById(id!),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: updateBookRating,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book", id as string] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading book details...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        Failed to load book details.
      </div>
    );
  }

  const book = data?.data;

  const handleRatingClick = (rating: number) => {
    if (id) {
      mutation.mutate({ id, rating });
    }
  };

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
              <BreadcrumbLink>
                <Link to={"/"}>Books</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>Book</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden animate-fade-in">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-64 w-full object-cover md:w-64"
                src={book.coverImage}
                alt={book.title}
              />
            </div>
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
              <p className="text-gray-700 text-base mb-4">
                <strong>Author:</strong> {book.author}
              </p>
              <p className="text-gray-700 text-base mb-4">
                <strong>Genre:</strong> {book.genre}
              </p>
              <p className="text-gray-700 text-base mb-4">
                <strong>Publication Date:</strong> {book.Date}
              </p>
              <p className="text-gray-700 text-base mb-4">
                {showFullDescription
                  ? book.description
                  : `${book.description.substring(0, 150)}...`}
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-blue-500 hover:underline ml-2"
                >
                  {showFullDescription ? "Read Less" : "Read More"}
                </button>
              </p>
              <div className="flex items-center mb-4">
                <span className="text-gray-700 text-base mr-2">
                  <strong>Rating:</strong>
                  {book.rating}
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      onClick={() => handleRatingClick(index + 1)}
                      className={`w-6 h-6 cursor-pointer ${
                        index < book.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.417 8.253L12 18.897l-7.417 4.626L6 15.27 0 9.423l8.332-1.268z" />
                    </svg>
                  ))}
                </div>
              </div>
              <a
                href={book.file}
                download={book.title ? `${book.title}.pdf` : "book.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookDetailsPage;
