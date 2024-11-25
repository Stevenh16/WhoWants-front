import './../styles/home.css';
import ProfileButton from '../components/profileButton';
import NotiButton from '../components/notiButton';
import BarButton from '../components/barButton';
import SearchBar from '../components/searchBar';
import Publicaciones from '../components/posts';
import ToPostBar from '../components/topostBar';
function Home() {
    return (
        <div>
            <header>
                <div id = "left" className='left'>
                    <h1>WHO WANTS?</h1>
                    <div id="searchBar" className="searchBar">
                        <SearchBar/>
                    </div>
                </div>
                <nav id="nav" class="responsive">
                    <ul>
                        <li><NotiButton/></li>
                        <li><ProfileButton/></li>
                        <li><BarButton/></li>
                    </ul>
                </nav>
            </header>
            <section id = "toPost" className='toPost'>
                <ToPostBar/>
            </section>
            <section>
                <Publicaciones/>
            </section>
        </div>
    );
}

export default Home;