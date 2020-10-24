import React, { useEffect, useState } from 'react';
import cx from 'clsx';
import GroupIcon from '@material-ui/icons/Group';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Accordion, AccordionSummary, AccordionDetails, TableContainer, Paper, CardHeader, CardContent, TableBody, TableCell, TableRow, TableHead, Table, Card } from '@material-ui/core';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './tarjetaPP.styles'
import { createGrupoPp } from "../../../../store/actions/grupoPM"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import Icon from '@material-ui/core/Icon';
// import { getPPdePM } from '../../../../store/actions/pairprogramming';
const useStyles2 = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));



//tabla de alumnos Estilos-----------------------------------------------------
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledCard = withStyles((theme) => ({
  root: { backgroundColor: theme.palette.common.black, },
}))(CardHeader);


export default function TarjetaPP({ grupoPP, grupoId, cohorteId }) {
  const classes2 = useStyles2();
  const classes = useStyles();
  const cardHeaderStyles = useContainedCardHeaderStyles();
  const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
  const cardHeaderShadowStyles = useFadedShadowStyles();
  const dispatch = useDispatch();
  const { cohorte } = useParams();


  const handleSubmit = () => {
    dispatch(createGrupoPp({ cohorteId, grupoId }))
  };

  return (
    <Card className={cx(classes.card)} styl >

      < StyledCard classes={cardHeaderStyles} title={'Grupo PP'} subheader={'Cohorte'} />
      < CardContent className={classes.content} >
        <div>
          <Button variant="contained"
            onClick={() => handleSubmit()}
            color="primary"
            className={classes2.button}
            startIcon={<GroupIcon />}
          >
            Crear grupo Pair Programming
      </Button>
        </div>
        <Table>
          <TableBody>
            {grupoPP && grupoPP.map(grupo => (
              <div key={grupo.id} className={classes.root}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <TableRow >
                      <TableCell aling='center' >Grupo {grupo.id}</TableCell>
                      <TableCell align="center">({grupo.usuarios.length} alumnos)</TableCell>
                    </TableRow>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                          <TableHead>
                            <StyledTableRow>
                              <StyledTableCell>Email</StyledTableCell>
                              <StyledTableCell>Nombre</StyledTableCell>
                              <StyledTableCell align="right">Rol</StyledTableCell>
                            </StyledTableRow>
                          </TableHead>
                          <TableBody >
                            {grupo.usuarios.map((datos) => (
                              <StyledTableRow key={datos.id} >
                                <StyledTableCell component="th" scope="row">
                                  {datos.email}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                  {datos.nombre}
                                </StyledTableCell>
                                <StyledTableCell align="right">{datos.rol}</StyledTableCell>
                              </StyledTableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </TableBody>
        </Table >
      </CardContent >
    </Card >
  );
}


