import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@mui/material';
import { SHADOWSTYLE, TABLECOLOR } from '../../utils/const/Const';
import { CoffeeConsumes } from '../../utils/interfaces/Interfaces';
interface Props {
  coffee: CoffeeConsumes[]
  loading: boolean
}

const TableCoffee = ({ loading, coffee }: Props) => {

  return (
    <TableContainer sx={{ borderRadius: '11px', mb: '20px',mt:'30px', mx: 'auto', width: '70%', ...SHADOWSTYLE, ...TABLECOLOR }} >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>POWER</TableCell>
            <TableCell>VOLTAGE</TableCell>
            <TableCell>AMPERE</TableCell>
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

          {coffee?.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c?.data?.receivedData?.watt != undefined ? c.data.receivedData.watt : '0'} W</TableCell>
              <TableCell>{c?.data?.receivedData?.volts != undefined ? c.data.receivedData.volts : '0'} V</TableCell>
              <TableCell>{c?.data?.receivedData?.ampere != undefined ? c.data.receivedData.ampere : '0'} A</TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableCoffee