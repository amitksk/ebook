import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBook } from "@/http/api";
import useTokenStore from "@/store";

function CreateBook() {

  const accessToken = useTokenStore((state) => state.accessToken);
  // Redirect to /auth/login if accessToken is empty
  if (!accessToken) {
    return <Navigate to={"/auth/login"} replace />;
  }
  
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const queryClint= useQueryClient();
  // Mutations
  const mutation = useMutation({
    mutationFn: createBook,
    onSuccess: (data) => {
      queryClint.invalidateQueries({queryKey: ['books']});
      console.log("Create Book Successfully" + JSON.stringify(data));
      navigate("/books");
    },
  });

  const handleCreateBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !genre || !coverImage || !file) {
      return alert("Please fill in all the fields");
    }
    console.log({ title, description, author, genre, coverImage });


    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("author", author);
    formData.append("genre", genre);
    formData.append("coverImage", coverImage);
    formData.append("file", file);

    mutation.mutate(formData);

    //Reset form after submission
    setTitle("");
    setDescription("");
    setAuthor("");
    setGenre("");
    setCoverImage(null);
    setFile(null);
  };

  return (
    <section>
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/books">Books</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Link to="/">
        <div className="flex justify-end">
          <Button>
            <span className="ml-2">Cancle</span>
          </Button>
        </div>
      </Link>

      {/* <Card className="mt-6">
        <CardHeader>
          <CardTitle>Create a new Book</CardTitle>
          <CardDescription>
            Create a new book entry for your collection. Fill out the form to
          </CardDescription>
        </CardHeader>
      </Card> */}

      <div className="min-h-screen from-blue-100 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-blue-600 p-8 text-white flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">Add New Book</h2>
              <p className="text-blue-100 mb-4">
                Fill out the form to add a new book to your collection. Provide
                as much detail as possible to help others discover your favorite
                reads.
              </p>
              <div className="hidden md:block">
                <svg
                  className="w-full max-w-sm mx-auto"
                  viewBox="0 0 1090 1090"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="545"
                    cy="545"
                    r="544.5"
                    stroke="white"
                    strokeOpacity="0.1"
                  />
                  <circle
                    cx="545"
                    cy="545"
                    r="480.5"
                    stroke="white"
                    strokeOpacity="0.1"
                  />
                  <circle
                    cx="545"
                    cy="545"
                    r="416.5"
                    stroke="white"
                    strokeOpacity="0.1"
                  />
                  <circle
                    cx="545"
                    cy="545"
                    r="352.5"
                    stroke="white"
                    strokeOpacity="0.1"
                  />
                  <path
                    d="M545 0L545 1090"
                    stroke="white"
                    strokeOpacity="0.1"
                  />
                  <path
                    d="M0 545L1090 545"
                    stroke="white"
                    strokeOpacity="0.1"
                  />
                </svg>
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <form onSubmit={handleCreateBookSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="text-sm font-medium text-gray-700"
                  >
                    Title
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter book title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-700"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter book description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="author"
                    className="text-sm font-medium text-gray-700"
                  >
                    Author
                  </Label>
                  <Input
                    id="author"
                    type="text"
                    placeholder="Enter author name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="genre"
                    className="text-sm font-medium text-gray-700"
                  >
                    Genre
                  </Label>
                  <Select value={genre} onValueChange={setGenre} required>
                    <SelectTrigger
                      id="genre"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fiction">Fiction</SelectItem>
                      <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                      <SelectItem value="science-fiction">
                        Science Fiction
                      </SelectItem>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                      <SelectItem value="mystery">Mystery</SelectItem>
                      <SelectItem value="thriller">Thriller</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                      <SelectItem value="horror">Horror</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="coverImage"
                    className="text-sm font-medium text-gray-700"
                  >
                    Cover Image
                  </Label>
                  <Input
                    id="coverImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="file"
                    className="text-sm font-medium text-gray-700"
                  >
                    Book PDF
                  </Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  {mutation.isPending ? "Uploading..." : "Add Book"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateBook;
