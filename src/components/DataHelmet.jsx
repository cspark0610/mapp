import React from 'react';
import { Helmet } from 'react-helmet';


export const DataHelmet = ({title}) => {
    return (
        <Helmet>
            <title>{`${title}- by Carlos Park`}</title>
        </Helmet>
    )
}
