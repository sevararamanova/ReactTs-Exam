import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import AOS from 'aos';
import 'aos/dist/aos.css';
import placeholder from '../../images/placeholder.webp';
import Footer from '../../components/footer/Footer';
import SearchNavbar from '../../components/searchNavbar/SearchNavbar';

const baseURL = import.meta.env.VITE_BASE_URL;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);

  const { error, isLoading } = useSWR(`${baseURL}/blog/${id}`, fetcher, {
    onSuccess: (data) => {
      setPost(data);
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

  return (
    <div>
      <SearchNavbar />
      <div className="container py-4">
        {post ? (
          <div className="blog-post" data-aos="fade-up">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-800">{post.title}</h1>
            <img
              src={post.image || placeholder}
              alt={post.title}
              className="w-full h-80 object-cover mb-4"
              onError={(e) => (e.currentTarget.src = placeholder)}
            />
            <div className="blog-content">
              <p>{post.content}</p>
            </div>
          </div>
        ) : (
          <h2 className="text-center">Post not found</h2>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default BlogPost;
