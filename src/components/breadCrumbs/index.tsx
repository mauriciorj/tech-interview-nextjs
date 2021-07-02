import React from 'react';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';

const BreadCrumbs = ({ breadCrumbInfo }: any) => {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            {breadCrumbInfo.map((item) => (
                item.link ? (
                    <Link color="inherit" href="/" key={item.title}>
                        {item.title}
                    </Link>
                ) : (
                    <Typography color="textPrimary" key={item.title}>{item.title}</Typography>
                )
            ))}
        </Breadcrumbs>
    );
};

export default BreadCrumbs;
