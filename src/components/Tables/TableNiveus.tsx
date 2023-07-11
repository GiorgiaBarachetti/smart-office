import React from 'react'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { SHADOWSTYLE, TABLECOLOR } from '../../utils/const/Const';
import { Niveus } from '../../utils/interfaces/Interfaces';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import Brightness1OutlinedIcon from '@mui/icons-material/Brightness1Outlined';
interface Props {
  niveus: Niveus[]
}

const TableNiveus = ({ niveus }: Props) => {
  return (<>
          {niveus?.map((n) => (
            <Box component='div' key={n.id} sx={{textAlign:'center', p:'10px'}}>
              {n?.data?.receivedData?.watt != undefined && n?.data?.receivedData?.watt >= 20 ? (
                <Brightness1Icon style={{ color: 'white' }} />
              ) : (
                <Brightness1OutlinedIcon style={{ color: 'white' }} />
              )}
              {n?.data?.receivedData?.watt != undefined && n?.data?.receivedData?.watt >= 55 ? (
                <Brightness1Icon style={{ color: 'white' }} />
              ) : (
                <Brightness1OutlinedIcon style={{ color: 'white' }} />
              )}
              {n?.data?.receivedData?.watt != undefined && n?.data?.receivedData?.watt >= 90 ? (
                <Brightness1Icon style={{ color: 'white' }} />
              ) : (
                <Brightness1OutlinedIcon style={{ color: 'white' }} />
              )}
              {n?.data?.receivedData?.watt != undefined && n?.data?.receivedData?.watt >= 110 ? (
                <Brightness1Icon style={{ color: 'white' }} />
              ) : (
                <Brightness1OutlinedIcon style={{ color: 'white' }} />
              )}
              {n?.data?.receivedData?.watt != undefined && n?.data?.receivedData?.watt >= 200 ? (
                <Brightness1Icon style={{ color: 'white' }} />
              ) : (
                <Brightness1OutlinedIcon style={{ color: 'white' }} />
              )}
            </Box>
          
          ))}
    <TableContainer sx={{ borderRadius: '11px', mb: '20px', mx: 'auto', width: '70%', ...SHADOWSTYLE, ...TABLECOLOR }} >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>POWER</TableCell>
            <TableCell>VOLTAGE</TableCell>
            <TableCell>AMPERE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {niveus?.map((n) => (
            <TableRow key={n.id}>
              <TableCell>{n?.data?.receivedData?.watt != undefined ? n.data.receivedData.watt : '0'} W</TableCell>
              <TableCell>{n?.data?.receivedData?.volts != undefined ? n.data.receivedData.volts : '0'} V</TableCell>
              <TableCell>{n?.data?.receivedData?.ampere != undefined ? n.data.receivedData.ampere : '0'} A</TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer>

  </>
  )
}

export default TableNiveus
