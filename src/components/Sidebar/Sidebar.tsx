import MenuItem from './MenuItem';
import { ReactComponent as Folder } from '../../assets/icons/folder.svg';
import { ReactComponent as File } from '../../assets/icons/file.svg';
import { ReactComponent as Image } from '../../assets/icons/image.svg';
import { ReactComponent as Message } from '../../assets/icons/message.svg';
import { ReactComponent as Burger } from '../../assets/icons/hamburger.svg';
import { ReactComponent as AddFile } from '../../assets/icons/add-file.svg';
import { useContext, useState } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import useWindowDimensions from '../../hooks/window-dimensions.hooks';
import Me from '../../assets/pictures/Me.png';
// @ts-ignore
import Resume from '../../assets/Resume.pdf';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [expand, setExpand] = useState(false);
    const { isAuth } = useContext(AuthContext);
    const { width } = useWindowDimensions();
    const navigate = useNavigate()

    if (width < 600) {
        return (
            <nav style={{ height: expand ? `100%` : `10%`, backgroundColor: expand ? '#1C1C1C' : 'transparent' }}>
                <div className="nav-content">
                    <div className="nav-menu-burger" onClick={() => setExpand(!expand)} style={{ stroke: expand ? '#FFFFFF' : '#1C1C1C' }}>
                        <Burger />
                    </div>
                    <div className="nav-menu">
                        <MenuItem Svg={Folder} label="Portfolio" path="/portfolio" onClick={() => setExpand(false)} />
                        <MenuItem Svg={Image} label="Blog" path="/blog" onClick={() => setExpand(false)} />
                        <MenuItem Svg={Message} label="Contact" path="/contact" onClick={() => setExpand(false)} />
                        <MenuItem Svg={File} label="Resume" onClick={() => {
                            setExpand(false)
                            window.open(Resume)
                        }} />
                    </div>
                    <div className="nav-footer" onClick={() => {
                        navigate('/')
                        setExpand(false)
                    }}>
                        <img src={Me} alt='profile' />
                        <p className='slider-banner'>John Nguyen</p>
                    </div>
                </div>
            </nav>
        )
    }


    return (
        <nav>
            <div className='nav'>
                <div className="nav-menu" style={{ paddingTop: 40 }}>
                    <MenuItem Svg={Folder} label="Portfolio" path="/portfolio" />
                    <MenuItem Svg={Image} label="Blog" path="/blog" />
                    <MenuItem Svg={Message} label="Contact" path="/contact" />
                    <MenuItem Svg={File} label="Resume" onClick={() => window.open(Resume)} />
                    {isAuth && <MenuItem Svg={AddFile} label="New Post" path="/admin/create-post" />}
                </div>
                <div className="nav-footer">
                    <div className="nav-footer-content" onClick={() => {
                        navigate('/')
                        setExpand(false)
                    }}>
                        <img src={Me} alt='profile' />
                        <p className='slider-banner'>John Nguyen</p>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Sidebar;