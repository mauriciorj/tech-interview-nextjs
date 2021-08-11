import React from 'react';
import { Button } from '@material-ui/core';
import { theme as themeGlobal } from '../../styles/theme';

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

    return (
        <Button
            size="small"
            style={{
                backgroundColor: chipColor.backgroundColor,
                color: chipColor.color,
                marginLeft: '5px'
            }}
            onClick={() => onClick(label)}
            variant="contained">
            {label}
        </Button>
    );
};

export default LevelButton;
