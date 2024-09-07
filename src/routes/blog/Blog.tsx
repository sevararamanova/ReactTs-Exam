import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import Card from 'react-bootstrap/Card';
import Footer from '../../components/footer/Footer';
import useSWR from 'swr';
import AOS from 'aos';
import 'aos/dist/aos.css';
import placeholder from '../../images/placeholder.webp';
import SearchNavbar from '../../components/searchNavbar/SearchNavbar';
import './Blog.css'; // Maxsus CSS fayl

const baseURL = import.meta.env.VITE_BASE_URL;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const postsPerPage = 6;
  const navigate = useNavigate();

  const { error, isLoading } = useSWR<any[]>(`${baseURL}/blog`, fetcher, {
    onSuccess: (data) => {
      setData(data);
    },
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  if (error) {
    return <h2 className="text-center text-red-500">Something went wrong: {error.message}</h2>;
  }

  if (isLoading) {
    return <h2 className="text-center">Loading...</h2>;
  }

  const totalPages = Math.ceil((data.length || 0) / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCardClick = (postId: string) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <div className="blog-page">
      <SearchNavbar />
      <div className="container py-4">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-800">Our Blog</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentPosts.map((post: any) => (
            <Card
              key={post.id}
              className="blog-card relative border p-4 rounded shadow-lg"
              data-aos="fade-up"
              onClick={() => handleCardClick(post.id)}
            >
              <Card.Img
                variant="top"
                className="w-full h-48 object-cover mb-4"
                src={post.image || placeholder}
                onError={(e) => (e.currentTarget.src = placeholder)}
              />
              <Card.Body>
                <Card.Title className="text-xl font-bold mb-2 text-blue-700">{post.title}</Card.Title>
                <Card.Text className="text-gray-600 mb-2">{post.excerpt}</Card.Text>
                <button className="text-blue-500 hover:text-blue-700">Read More</button>
              </Card.Body>
            </Card>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="pagination-container mt-4 text-center">
            <Pagination>
              <Pagination.Prev
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <Pagination.Item
                  key={page}
                  active={page === currentPage}
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Blog;
