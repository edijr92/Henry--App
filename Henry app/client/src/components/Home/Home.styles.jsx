import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    contenedor: {
        paddingTop: '35px',
        display: 'flex',
        justifyContent: 'center',
    },
    image: {
        position: 'relative',
        height: 250,
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 200,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        // Estas son configuraciones de la imagen
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 100%',
        borderRadius: '30px'
    },
    imageBackdrop: {
        // Este es el fondo negro de la imagen
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
        borderRadius: '30px'
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(0)}px`,
        color: 'rgb(255 255 1)'
    },
    imageMarked: {
        height: 4,
        width: 50,
        backgroundColor: 'rgb(255 255 1)',
        position: 'absolute',
        bottom: -4,
        left: 'calc(37% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
}));