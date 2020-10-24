import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux'


const LineaConectora = withStyles({
    alternativeLabel: {
        top: 15,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,#FFFF8C 0%,#FFFF4C 50%,#FFFF00 100%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,#FFFF8C 0%,#FFFF4C 50%,#FFFF00 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

// Puntos
const useQontoStepIconStyles = makeStyles({
    active: {
        position: 'relative',
        bottom: '12px',
        width: '60px',
        height: '70px',
        backgroundSize: '60px 60px',
        backgroundImage: 'url("data:image/png;base64,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")',
        zIndex: 2,
    },
    circle: {
        position: 'relative',
        top: 12,
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: '#eaeaf0',
    },
    completed: {
        color: 'black',
        zIndex: 1,
        fontSize: 35,
    }
});


/// Son los puntos aun sin completar
function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;
    if (completed) { return (<Check className={classes.completed} />) }
    if (active) { return (<div className={classes.active} />) }
    else { return (<div className={classes.circle} />) }
}

export default function Trayectoria() {


    const user = useSelector((state) => state.user.user);
    const trayectoria = user.proceso

    return (
        <Stepper alternativeLabel activeStep={trayectoria - 1} connector={<LineaConectora />}>
            <Step>
                <StepLabel StepIconComponent={QontoStepIcon}>
                    <Typography>M1</Typography>
                </StepLabel>
            </Step>
            <Step>
                <StepLabel StepIconComponent={QontoStepIcon}>
                    <Typography>M2</Typography>
                </StepLabel>
            </Step>
            <Step>
                <StepLabel StepIconComponent={QontoStepIcon}>
                    <Typography>M3</Typography>
                </StepLabel>
            </Step>
            <Step>
                <StepLabel StepIconComponent={QontoStepIcon}>
                    <Typography>M4</Typography>
                </StepLabel>
            </Step>
        </Stepper>
    );
}