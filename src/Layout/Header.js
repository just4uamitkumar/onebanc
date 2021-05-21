import { Link, withRouter } from 'react-router-dom';
import logo from '../Assets/Images/logo_onebanc.png'

function Header() {
    return (
        <header>
            <div className="logo">
                <Link to='/'><img src={logo} alt="" /></Link>
            </div>
        </header>
    );
}

export default withRouter(Header);
