export const TestActionTypes = {
    PRUEBA_REDUX: 'PRUEBA_REDUX',
}

export const pruebaRedux = (prueba) => {
    return {
        type: TestActionTypes.PRUEBA_REDUX,
        payload: prueba
    }
}

//ESTA ACTION ES UNA PRUEBA DE REDUX