import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
//import { getBookById } from "@/http/api";

function BookDetailsPage() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["book", id],
   // queryFn: () => getBookById(id),
  });

  if (isLoading) {
    return <div>Loading book details...</div>;
  }

  if (isError) {
    return <div>Failed to load book details.</div>;
  }

  const book = data?.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>{book.description}</p>
    </div>
  );
}

export default BookDetailsPage;
