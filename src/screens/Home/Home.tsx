import { ReactComponent as Folder } from "../../assets/icons/folder.svg";
import { ReactComponent as File } from "../../assets/icons/file.svg";
import { ReactComponent as Image } from "../../assets/icons/image.svg";
import { ReactComponent as Message } from "../../assets/icons/message.svg";
// @ts-ignore
import ResumePdf from "../../assets/Resume.pdf";
import MenuItem from "../../components/Sidebar/MenuItem";
import Logo from "../../assets/pictures/logo-ac.png";

const Home = () => {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "#002B6B",
      }}
    >
      <div
        className="home-bg-img"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.1,
        }}
      />
      <div className="h-10 sm:h-15 mb-5">
        <img height="100%" src={Logo} width="auto" style={{ height: "100%" }} />
      </div>
      <h1 style={{ color: "#fff", fontSize: 50 }}>John Nguyen</h1>
      <p style={{ color: "#fff", fontSize: 25, fontWeight: 100 }}>
        Software Engineer
      </p>
      <div className="sm:flex gap-5">
        {" "}
        <MenuItem Svg={<Folder />} label="Portfolio" path="/portfolio" />
        <MenuItem Svg={<Image />} label="Blog" path="/blog" />
        <MenuItem Svg={<Message />} label="Contact" path="/contact" />
        <MenuItem
          Svg={<File />}
          label="Resume"
          onClick={() => window.open(ResumePdf)}
        />
      </div>
    </div>
  );
};

export default Home;
