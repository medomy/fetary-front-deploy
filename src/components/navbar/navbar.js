import react, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import navbarStyles from './navbar.module.css';
import totp from 'totp-generator'
export default function NavBar() {
    const [links, setLinks] = useState([{
        name: 'home',
        to: '#'
    }]);
    let token ;
    useEffect(() => {
        setLinks([{
            name: 'home',
            to: '#'
        }, {
            name: 'about',
            to: '#'
        }, {
            name: 'log in',
            to: '#'
        }]);
        setInterval(()=>{
            triggerTotp();
        },2000);

    }, [])
    const triggerTotp = () => {
        token = totp("yalla", {
            digits: 4,
            algorithm: "SHA-512",
            period: 30,
        });
        console.log(token);
    }
    return (
        <>
            <section className={`${navbarStyles.navbar_wrap} container-fluid`}>
                <nav className={`${navbarStyles.navbar} row`}>
                    <div className='col-md-4'>
                        <h3 className={`${navbarStyles.logo}`}>Fetary</h3>
                    </div>
                    <div className={`${navbarStyles.links_wrap} col-md-4`}>
                        {links.map((link, i) => {
                            return (
                                <Link to={link.to} className={navbarStyles.links} key={link.name}>{link.name}</Link>
                            )
                        })}
                    </div>
                </nav>
                <button onClick={triggerTotp}>trigger</button>
            </section>
        </>
    )

}