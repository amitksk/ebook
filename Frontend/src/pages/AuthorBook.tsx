import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getAuthorBooks } from "@/http/api";
import useTokenStore from "@/store";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate } from "react-router-dom";


interface Book {
    id: string;
    coverImage: string;
    title: string;
    author: string;
}

function AuthorBook() {

  const accessToken = useTokenStore((state) => state.accessToken);
  if (!accessToken) {
    return <Navigate to={"/auth/login"} replace />;
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["author-books"],
    queryFn: getAuthorBooks,
    staleTime: 20000,
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">Failed to load books.</div>
    );
  }

  const authorBook = Array.isArray(data?.data) ? data.data : [];

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
                 <Link to={"/books"}>Books</Link>
               </BreadcrumbLink>
             </BreadcrumbItem>
             <BreadcrumbSeparator />

             <BreadcrumbItem>
               <BreadcrumbPage>Author Book</BreadcrumbPage>
             </BreadcrumbItem>

           </BreadcrumbList>
         </Breadcrumb>
      </div>
     
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {authorBook.map((books: Book) => (
        <div key={books.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={books.coverImage} alt={books.title} className="w-full h-64 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{books.title}</h2>
            <p className="text-gray-600">{books.author}</p>
          </div>
        </div>
      ))}
    </div>
    </section>
  );
}

export default AuthorBook;
