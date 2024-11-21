import {FC} from "react";
import {Helmet} from "react-helmet";

interface IMetaDataProps {
    pageTitle: string;
    pageDescription?: string;
}

const MetaData: FC<IMetaDataProps> = ({ pageTitle, pageDescription=""}) => {
    return (
        <Helmet>
            <title>{pageTitle}</title>
            <meta name="descrition" content={pageDescription} />
        </Helmet>
    )
}

export default MetaData;