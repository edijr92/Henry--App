import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

    //tabla de alumnos Estilos-----------------------------------------------------
    table: {
        minWidth: 700,
    },
    /////////
    root: {
        width: '100%',
        marginTop: '40px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    card: {
        marginTop: 40,
        transition: '0.3s',
        width: '50%',
        overflow: 'initial',
        background: '#ffffff',
        margin: 'auto'
    },
    content: {
        paddingTop: 0,
        textAlign: 'left',
        overflowX: 'auto',
        '& table': {
            marginBottom: 0,
        }
    },

}));