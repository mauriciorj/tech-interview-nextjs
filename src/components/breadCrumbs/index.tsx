import React from 'react';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';

export interface Props {
    breadCrumbInfo: { link?: string; title?: string }[];
}

const BreadCrumbs: React.FC<Props> = ({ breadCrumbInfo }) => {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            {breadCrumbInfo.map((item) =>
                item.link ? (
                    <Link color="inherit" href="/" key={item.title}>
                        {item.title}
                    </Link>
                ) : (
                    <Typography color="textPrimary" key={item.title}>
                        {item.title}
                    </Typography>
                )
            )}
        </Breadcrumbs>
    );
};

export default BreadCrumbs;
