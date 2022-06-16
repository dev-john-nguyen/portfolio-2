import { useState } from "react";
import { PageWrapper } from "../../components/PageWrapper"
import PortfolioItem from "./PortfolioItem";
import portfolioItems from "./portfolio-items";

const Portfolio = () => {
    const [activePortfolio, setActivePortfolio] = useState(0);

    const onNext = () => setActivePortfolio(num => num >= portfolioItems.length - 1 ? 0 : num + 1);

    const onPrevious = () => setActivePortfolio(num => num < 1 ? portfolioItems.length - 1 : num - 1);

    const handleTranslateX = () => activePortfolio * 110;

    const handleCalcLeft = (index: number) => {
        if (index < 1) return 0;
        return ((index * 110)) + '%'
    }

    return (
        <PageWrapper label="Portfolio">
            <div className="portfolio">
                <div className="portfolio-wrapper" style={{
                    transform: `translateX(-${handleTranslateX()}%)`
                }}>
                    {portfolioItems.map((item, index) => <PortfolioItem key={index} index={index} style={{ left: handleCalcLeft(index) }} {...item} />)}
                </div>
            </div>
            <button className="portfolio-chevron portfolio-chevron-prev" onClick={onPrevious} />
            <button className="portfolio-chevron portfolio-chevron-next" onClick={onNext} />
        </PageWrapper>
    )
}

export default Portfolio