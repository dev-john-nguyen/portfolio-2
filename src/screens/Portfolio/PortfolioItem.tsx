import { FC } from 'react';
import GithubMark from '../../assets/pictures/Github.png';
import WorldMark from '../../assets/pictures/World-Image.png';
import portfolioItems, { PortfolioItemTypes } from './portfolio-items';


type Props = {
    style?: React.CSSProperties
    index: number
}

const PortfolioItem: FC<Props & PortfolioItemTypes> = ({ img, style, index, description, github, website, name }) => {
    return (
        <div className="portfolio-item" style={style}>
            <div className="portfolio-item-row-1">
                <strong>{index + 1}/{portfolioItems.length}</strong>
            </div>
            <div className="portfolio-item-row-2">
                <div className="portfolio-item-image">
                    <img src={img} width='100%' height='auto' alt={`${name}`} />
                </div>
            </div>
            <div className="portfolio-item-row-3">
                <div className="portfolio-item-line" />
                <div className="portfolio-item-marks">
                    <a href={website ? website : "#"}>
                        <div className={`portfolio-item-mark portfolio-item-mark-${website ? "active" : "disabled"}`}>
                            <img src={WorldMark} width='100%' height='100%' alt="world-watermark" />
                        </div>
                    </a>
                    <a href={github ? github : "#"}>
                        <div className={`portfolio-item-mark portfolio-item-mark-${github ? "active" : "disabled"}`}>
                            <img src={GithubMark} width='100%' height='100%' alt="github-watermark" />
                        </div>
                    </a>
                </div>
            </div>
            <div className="portfolio-item-row-4">
                <h2>{name}</h2>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default PortfolioItem;