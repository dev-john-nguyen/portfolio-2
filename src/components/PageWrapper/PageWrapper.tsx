import { FC } from "react";
import { Loader } from "../Loader";
import Header from "./Header";

type Props = {
    children: any
    label: string
    subLabel?: string
    loading?: boolean
}

const PageWrapper: FC<Props> = ({ children, label, subLabel, loading }) => {
    return (
        <div className="page">
            {
                loading ? <div className="loader">
                    <Loader />
                    <p>Loading...</p>
                </div> :
                    <>
                        <Header label={label} subLabel={subLabel} />
                        <div className="page-content">
                            {children}
                        </div>
                    </>
            }
        </div>
    )
}
export default PageWrapper;