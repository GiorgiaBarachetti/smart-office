import React from 'react'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@mui/material';
import { SHADOWSTYLE, TABLECOLOR } from '../../utils/const/Const';
import { Niveus } from '../../utils/interfaces/Interfaces';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import Brightness1OutlinedIcon from '@mui/icons-material/Brightness1Outlined';
interface Props {
  niveus: Niveus[]
  loading: boolean
}

const TableNiveus = ({ loading, niveus }: Props) => {


  return (<>
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
          {loading && (
            <TableRow>
              <TableCell colSpan={4}>
                <LinearProgress />
              </TableCell>
            </TableRow>
          )}

          {niveus?.map((n) => (
            <TableRow key={n.id}>
              <TableCell>{n?.data?.receivedData?.watt != undefined ? n.data.receivedData.watt : ''} W</TableCell>
              <TableCell>{n?.data?.receivedData?.volts != undefined ? n.data.receivedData.volts : ''} V</TableCell>
              <TableCell>{n?.data?.receivedData?.ampere != undefined ? n.data.receivedData.ampere : ''} A</TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer>
    {niveus?.map((n) => (
      <Box key={n.id} textAlign={'center'}>
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

  </>
  )
}

export default TableNiveus
