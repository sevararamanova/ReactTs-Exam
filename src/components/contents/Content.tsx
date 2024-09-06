import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import nail1 from '../../images/nail.jpeg';
import powder1 from '../../images/powder.jpg';
import tanalka3 from '../../images/tanalka3.webp';
import tanalka4 from '../../images/tanalka4.webp';
import Footer from '../../components/footer/Footer'
import './Content.css';

const Content = () => {
    useEffect(() => {
      AOS.init({
        duration: 1000, 
        once: true, 
      });
  
      AOS.refresh();

      return () => {
        AOS.refresh(); 
      };
    }, []);
  return (
    <div className='content'>
        <div className='container'>
            <div className='content__look  p-10'>
                <img src={powder1} width={470} data-aos="zoom-in"/>
                <p>Lorem ipsum, dolor sit amet consectetur <br></br>adipisicing elit. Consequatur rerum dignissimos nisi <br></br>fugiat temporibus veritatis atque voluptatum autem <br></br>aut architecto inventore quos, eligendi necessitatibus.<br></br> Maiores sequi accusamus laborum? Vitae, modi!</p>
            </div>

            <div className='content__look'>
                <p>Lorem ipsum, dolor sit amet consectetur <br></br>adipisicing elit. Consequatur rerum dignissimos nisi <br></br>fugiat temporibus veritatis atque voluptatum autem <br></br>aut architecto inventore quos, eligendi necessitatibus.<br></br> Maiores sequi accusamus laborum? Vitae, modi!</p>
                <img src={tanalka3} width={300} data-aos="fade-right" />
            </div>

            <div className='content__look'>
            <img src={nail1} width={400} data-aos="fade-left" />
                <p >Lorem ipsum, dolor sit amet consectetur <br></br>adipisicing elit. Consequatur rerum dignissimos nisi <br></br>fugiat temporibus veritatis atque voluptatum autem <br></br>aut architecto inventore quos, eligendi necessitatibus.<br></br> Maiores sequi accusamus laborum? Vitae, modi!</p>
            </div>

            <div className='content__look'>
                <p>Lorem ipsum, dolor sit amet consectetur <br></br>adipisicing elit. Consequatur rerum dignissimos nisi <br></br>fugiat temporibus veritatis atque voluptatum autem <br></br>aut architecto inventore quos, eligendi necessitatibus.<br></br> Maiores sequi accusamus laborum? Vitae, modi!</p>
                <img src={tanalka4} width={250} data-aos="zoom-in" />
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Content;
