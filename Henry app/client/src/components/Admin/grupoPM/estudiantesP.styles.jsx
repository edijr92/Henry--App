import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    contenedor: {
        display: 'flex',
        justifyContent: 'center',
    },
    div1: {
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '40px',
        margin: 'auto',
    },
    div2: {
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    card: {
        borderRadius: '20px',
        width: '150px',
        height: '260px'
    },
    card2: {
        borderRadius: '20px',
        padding: '25px',
        paddingTop: '0px',
        borderStyle: 'solid',
        border: '2px'

    },
    media: {
        height: 0,
        paddingTop: '100%', // 16:9
    },
    //  Pop Over
    typography: {
        padding: theme.spacing(1),
    },
    botones: {
        display: 'flex',
        alignItems: 'center'
    }
    /////////
}));