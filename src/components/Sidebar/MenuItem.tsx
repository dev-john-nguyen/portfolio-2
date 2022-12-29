import { FC } from "react";
import { Link } from "react-router-dom";
type Props = {
  Svg: JSX.Element;
  label: string;
  path?: string;
  onClick?: () => void;
  isHome?: boolean;
};

const MenuItem: FC<Props> = ({ Svg, label, path, onClick, isHome }) => {
  return (
    // eslint-disable-next-line no-useless-concat
    <div className={"nav-menu-item" + (isHome ? " nav-menu-item-home" : "")}>
      <Link to={path ? path : "#"} onClick={onClick}>
        {Svg}
        <p className="slider-banner">{label}</p>
      </Link>
    </div>
  );
};

export default MenuItem;
