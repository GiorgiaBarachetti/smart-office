import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@mui/material';
import { Printer } from '../../utils/interfaces/Interfaces';
import { SHADOWSTYLE, TABLECOLOR } from '../../utils/const/Const';

interface Props {
  printer: Printer[];
  loading: boolean;
}

const TablePrinter = ({ loading, printer }: Props) => {
  return (
    <TableContainer sx={{ borderRadius: '6px', bgcolor: 'white', mx: 'auto', my: '30px', width: '85%', ...SHADOWSTYLE }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>POWER</TableCell>
            <TableCell>VOLTAGE</TableCell>
            <TableCell>CURRENT</TableCell>
            <TableCell>TOTAL KWH</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={4}>
                <LinearProgress />
              </TableCell>
            </TableRow>
          )}
          {printer?.map((p) => (
            <TableRow key={p.tplinkStampante.id}>
              <TableCell>{p.tplinkStampante.power.value} {p.tplinkStampante.power.unit}</TableCell>
              <TableCell>{p.tplinkStampante.voltage.value} {p.tplinkStampante.voltage.unit}</TableCell>
              <TableCell>{p.tplinkStampante.current.value} {p.tplinkStampante.current.unit}</TableCell>
              <TableCell>{p.tplinkStampante.total.value} {p.tplinkStampante.total.unit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablePrinter;
