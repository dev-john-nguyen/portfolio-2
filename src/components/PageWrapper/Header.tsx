import { FC } from "react";

type Props = {
    label: string
    subLabel?: string
}

const Header: FC<Props> = ({ label, subLabel }) => {
    return (
        <div className="page-header">
            <div className="page-header-title">
                <h1>{label}</h1>
                <div className="page-header-line" />
            </div>
            {subLabel && (
                <h2>{subLabel}</h2>
            )}
        </div>
    )
}

export default Header;