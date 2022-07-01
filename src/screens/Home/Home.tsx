import { PageWrapper } from "../../components/PageWrapper"
import { ReactComponent as Coding } from '../../assets/icons/home-coding.svg';
import { ReactComponent as Apps } from '../../assets/icons/home-apps.svg';
import { ReactComponent as Contact } from '../../assets/icons/home-contact.svg';
import { ReactComponent as Resume } from '../../assets/icons/home-resume.svg';
import { ReactComponent as Writing } from '../../assets/icons/home-writing.svg';
import { ReactComponent as LongLine } from '../../assets/icons/home-long-line.svg';
import { ReactComponent as ShortLine } from '../../assets/icons/home-short-line.svg';
import { Link } from "react-router-dom";
// @ts-ignore
import ResumePdf from '../../assets/Resume.pdf';

const Home = () => {
    return (
        <PageWrapper label="Hi, I'm John!" subLabel="I’m a software engineer who focuses on writing clean and efficient code.">
            <div className="home">
                <div className="home-menu">
                    <Link to='/portfolio' className="home-menu-options">
                        <Apps />
                        <div className="home-menu-options-curtain" />
                        <div className="home-menu-options-desc">
                            <h1>Portfolio</h1>
                        </div>
                    </Link>
                    <Link to='/blog' className="home-menu-options">
                        <Writing />
                        <div className="home-menu-options-curtain" />
                        <div className="home-menu-options-desc">
                            <h1>Blog</h1>
                        </div>
                    </Link>
                    <div className="home-menu-options" onClick={() => window.open(ResumePdf)} >
                        <Resume />
                        <div className="home-menu-options-curtain" />
                        <div className="home-menu-options-desc">
                            <h1>Resume</h1>
                        </div>
                    </div>
                    <Link to='/contact' className="home-menu-options">
                        <Contact />
                        <div className="home-menu-options-curtain" />
                        <div className="home-menu-options-desc">
                            <h1>Contact</h1>
                        </div>
                    </Link>
                </div>
                <div className="coding-img">
                    <Coding />
                </div>

                <div className="line-1">
                    <LongLine />
                </div>

                <div className="line-2">
                    <ShortLine />
                </div>

                <div className="line-3">
                    <ShortLine />
                </div>

                <div className="line-4">
                    <LongLine />
                </div>

            </div>
        </PageWrapper>
    )
}

export default Home