module.exports = {
    Cohorte: [
        {
            //id: 1,
            fecha: Date.now(),
            nombre: "Webft-03"
        },
        {
            //id: 2,
            fecha: Date.now(),
            nombre: "Webft-04"
        },
        {
            //id: 3,
            fecha: Date.now(),
            nombre: "Webft-05"
        },
    ],
    Grupo: [
        {
            //id: 1,
            cohorteId: 1,
        },
        {
            //id: 2,
            cohorteId: 1,
        },
        {
            //id: 3,
            cohorteId: 1,
        },
        {
            //id: 4,
            cohorteId: 2,
        },
        {
            //id: 5,
            cohorteId: 2,
        },
        {
            //id: 6,
            cohorteId: 2,
        },
        {
            //id: 7,
            cohorteId: 3,
        },
        {
            //id: 8,
            cohorteId: 3,
        },
    ],
    Clase: [
        //M1-----------------------------------------------------------------------------------------------
        {
            modulo: "M1",
            clase: "1 - Intro to CS",
            link: "https://vimeo.com/429349951/4e72ea35d9"
        },
        {
            modulo: "M1",
            clase: '2 - JavaScript Avanzado I',
            link: 'https://vimeo.com/429671745/1232af0916'
        },
        {
            modulo: "M1",
            clase: '3 - JavaScript Avanzado II',
            link: "https://vimeo.com/430041260/44a6d74643"
        },
        {
            modulo: "M1",
            clase: '4 - Estructura de Datos I',
            link: "https://vimeo.com/430389231/768da7de11"
        },
        {
            modulo: "M1",
            clase: "5 - Estructura de Datos II",
            link: "https://vimeo.com/430764499/240086cfc8"
        },
        {
            modulo: "M1",
            clase: '6 - Estructura de Datos III',
            link: 'https://vimeo.com/431510694/adaf1435d9'
        },
        {
            modulo: "M1",
            clase: '7 - Algoritmos I',
            link: "https://vimeo.com/431871297/72a5143b0d"
        },
        {
            modulo: "M1",
            clase: '8 - Algoritmos II',
            link: "https://vimeo.com/432174484/b47422614c"
        },
        //M2------------------------------------------------------------------------------------
        {
            modulo: "M2",
            clase: "1 - DOM - Selectores",
            link: "https://vimeo.com/433693016/0dfd90ddac"
        },
        {
            modulo: "M2",
            clase: '2 - CSS Avanzado',
            link: 'https://vimeo.com/434031951/25fc9a7609'
        },
        {
            modulo: "M2",
            clase: '3 - ES6',
            link: "https://vimeo.com/434399490/1e87a7eb9b"
        },
        {
            modulo: "M2",
            clase: '4 - AJAX',
            link: "https://vimeo.com/434751131/2837c7ffd1"
        },
        {
            modulo: "M2",
            clase: "5 - Modulos",
            link: "https://vimeo.com/435118330/1e5b5a4909"
        },
        {
            modulo: "M2",
            clase: '6 - React Intro',
            link: 'https://vimeo.com/435789227/9d6eca6374'
        },
        {
            modulo: "M2",
            clase: '7 - React Estilos',
            link: "https://vimeo.com/436125377/34ab0f90c0"
        },
        {
            modulo: "M2",
            clase: '8 - React LifeCicle',
            link: "https://vimeo.com/436476067/2dd837fe6b"
        },
        {
            modulo: "M2",
            clase: "9 - React Router DOM",
            link: "https://vimeo.com/436820571/1cf02ccf07"
        },
        {
            modulo: "M2",
            clase: '10 - React Form',
            link: 'https://vimeo.com/437172701/5aacf34e22'
        },
        {
            modulo: "M2",
            clase: '11 - Redux Intro',
            link: "https://vimeo.com/437899652/c943a28d34"
        },
        {
            modulo: "M2",
            clase: '12 - Redux',
            link: "https://vimeo.com/438241783/05a4dcf586"
        },
        {
            modulo: "M2",
            clase: "13 - Hooks",
            link: "https://vimeo.com/438600826/80bcb9910c"
        },
        //M3--------------------------------------------------------------------------------------------
        {
            modulo: "M3",
            clase: '1 - Node JS',
            link: 'https://vimeo.com/424894373'
        },
        {
            modulo: "M3",
            clase: '2 - Promises',
            link: "https://vimeo.com/440366047/6e213007a6"
        },
        {
            modulo: "M3",
            clase: '3 - Web Server',
            link: "https://vimeo.com/440715091/e555e4a5ea"
        },
        {
            modulo: "M3",
            clase: '4 - Advanced Promises I',
            link: 'https://vimeo.com/441049103/f966267eba'
        },
        {
            modulo: "M3",
            clase: '5 - Advanced Promises II',
            link: "https://vimeo.com/441337451/2cdeee4edc"
        },
        {
            modulo: "M3",
            clase: '6 - Express',
            link: "https://vimeo.com/442071197/31504dff18"
        },
        {
            modulo: "M3",
            clase: '7 - Testing',
            link: 'https://vimeo.com/442402752/de2f14759c'
        },
        //M4-------------------------------------------------------------------------------------------------
        {
            modulo: "M4",
            clase: '1 - DBMS',
            link: "https://vimeo.com/444268168/45c0243764"
        },
        {
            modulo: "M4",
            clase: '2 - SQL',
            link: "https://vimeo.com/444595557/05d48764b9"
        },
        {
            modulo: "M4",
            clase: '3 - ORMs',
            link: 'https://vimeo.com/444935416/f0946b28d2'
        },
        {
            modulo: "M4",
            clase: '4 - Sequelize',
            link: "https://vimeo.com/445243471/9fdb5927ce"
        },

    ],
    Pair: [
        {
            //id: 1,
            alumnos: 6,
            cohorteId: 1,
            grupoId: 1,
        },
        {
            //id: 2,
            alumnos: 6,
            cohorteId: 1,
            grupoId: 2
        }
    ],









    // TODO DE LO QUE USUARIO DEPENDA EJ:Cohortes, Grupo, etc. Va arriba.  
    Usuario: [
        {
            nombre: "Admin",
            apellido: "Henry",
            edad: 0,
            rol: "director",
            localidad: "BsAs",
            active: true,
            password: "1234",
            email: "admin@henry.com",
        },
        {
            nombre: "Alumno1",
            apellido: "Henry",
            edad: 18,
            rol: "alumno",
            localidad: "BsAs",
            active: true,
            password: "1234",
            email: "alumno1@henry.com",
            proceso: 1,
            cohorteId: 1,
            grupoId: 1,
            pairId: 1
        },
        {
            nombre: "Alumno2",
            apellido: "Henry",
            edad: 18,
            rol: "alumno",
            localidad: "BsAs",
            active: true,
            password: "1234",
            email: "alumno2@henry.com",
            proceso: 1,
        },
        {
            nombre: "Pm1",
            apellido: "Henry",
            edad: 18,
            rol: "pm",
            localidad: "BsAs",
            active: true,
            password: "1234",
            email: "pm1@henry.com",
            cohorteId: 1,
            grupoId: 1,
            pairId: 1,
        },
        {
            nombre: "Alumno3",
            apellido: "Henry3",
            edad: 21,
            rol: "alumno",
            localidad: "cuba",
            active: true,
            password: "1234",
            email: "alumno44@henry.com",
            proceso: 1,
        },
        {
            nombre: "Alumno4",
            apellido: "Henry4",
            edad: 41,
            rol: "alumno",
            localidad: "neuquen",
            active: true,
            password: "1234",
            email: "alumno32@henry.com",
            proceso: 1,
        }
    ],

}
