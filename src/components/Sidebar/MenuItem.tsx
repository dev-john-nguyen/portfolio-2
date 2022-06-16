import { FunctionComponent, SVGProps, FC } from "react";
import { Link } from 'react-router-dom'
type Props = {
    Svg: FunctionComponent<SVGProps<SVGSVGElement>>;
    label: string;
    path?: string;
    onClick?: () => void;
}

const MenuItem: FC<Props> = ({ Svg, label, path, onClick }) => {
    return (
        <div className="nav-menu-item">
            <Link to={path ? path : "#"} onClick={onClick}>
                <Svg />
                <p className="slider-banner">{label}</p>
            </Link>
        </div>
    )
}

export default MenuItem;