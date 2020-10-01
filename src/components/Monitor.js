import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import CircularStatic from './CircularStatic';
import { makeStyles } from '@material-ui/core/styles';
import useStyle from './Monitor.module.css'


const mStyles = makeStyles({
    
    tablehead: {
        fontWeight: 650
    }

  });

const Monitor = (props) => {

    const classes = mStyles();
    const handleDelete = (index) => {
        return (event) => {
            console.log(index, props.workers[index].name);
            props.deleteWorker(props.workers[index].name)
        }
    }

    const handleMaster = () => {
        return (event) => {
            
            props.deleteMaster()
        }
    }

    if(props.isMasterChange) {
        return (<CircularStatic />)
    }
    return (
        <div className={useStyle.container}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell className={classes.tablehead}>Роль</TableCell>
                        <TableCell className={classes.tablehead}>Номер процесса</TableCell>
                        <TableCell className={classes.tablehead}>Выполнено заданий</TableCell>
                        <TableCell className={classes.tablehead}>Действия</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Мастер
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {props.master}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                0
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <Button variant="contained" color="secondary" onClick={handleMaster()}>
                                    Выключить
                                </Button>
                            </TableCell>
                        </TableRow>
                        {props.workers.map((worker, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                Рабочий
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {worker.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {worker.value}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <Button variant="contained" color="primary" onClick={handleDelete(index)}>
                                    Выключить
                                </Button>
                            </TableCell>
                        
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div>
                <p className={useStyle.field}>Выполнено заданий с активными узлами: {props.activeWorkerTotal}</p>
                <p className={useStyle.field}>Выполнено заданий с активным мастером: {props.activeCount}</p>
                <p className={useStyle.field}>Общее количество выполненных заданий: {props.globalCount}</p>
            </div>

        </div>
    )
}

export default Monitor
