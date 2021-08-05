import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { theme as themeGlobal } from '../../styles/theme';

interface PropsStyle {
    backgroundColor: string;
    color: string;
}

const useStyles = makeStyles((theme) => ({
    cardChip: (chipColor: PropsStyle) => ({
        backgroundColor: chipColor.backgroundColor,
        color: chipColor.color,
        marginLeft: '5px',
        '&:hover': {
            backgroundColor: theme.palette.themeGrey.light,
            color: theme.palette.themeGrey.dark,
            border: `solid 1px ${theme.palette.themeGrey.dark}`
        }
    })
}));

export interface Props {
    label: string;
    state: boolean;
    onClick: (label: string) => void;
}

const LevelButton: React.FC<Props> = ({ label, state, onClick }) => {
    let chipColor;

    if (state === false) {
        chipColor = {
            backgroundColor: themeGlobal.palette.themeGrey.main,
            color: themeGlobal.palette.white.main
        };
    } else if (label === 'basic') {
        chipColor = {
            backgroundColor: themeGlobal.palette.primary.main,
            color: themeGlobal.palette.white.main
        };
    } else if (label === 'intermediate') {
        chipColor = {
            backgroundColor: themeGlobal.palette.green.main,
            color: themeGlobal.palette.white.main
        };
    } else {
        chipColor = {
            backgroundColor: themeGlobal.palette.red.main,
            color: themeGlobal.palette.white.main
        };
    }

    const classes = useStyles(chipColor);

    return (
        <Button size="small" className={classes.cardChip} onClick={() => onClick(label)}>
            {label}
        </Button>
    );
};

export default LevelButton;
