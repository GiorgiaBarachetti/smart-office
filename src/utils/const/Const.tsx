export const SHADOWSTYLE={
    boxShadow: '2px 4px 12px rgba(0,0,0,.08)',
    //transition: 'all .3s cubic-bezier(0,0,.5,1)'
}

export const TABLECOLOR={
  backgroundColor: '#706f6f' 
}

export const BOXSTYLE = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    p: '20px',
    borderRadius: '6px',
    bgcolor: 'lightgrey',
    mx: 'auto',
    my: '30px',
    width: {xs: '80%',sm: '80%', md: '70%'},
    ...SHADOWSTYLE
}