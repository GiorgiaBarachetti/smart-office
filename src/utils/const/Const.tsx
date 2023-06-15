export const SHADOWSTYLE={
  boxShadow: '2px 4px 12px rgba(0,0,0,.08)',
  //transition: 'all .3s cubic-bezier(0,0,.5,1)'
}

export const TABLECOLOR={
backgroundColor: 'white' 
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


import Andrea from '../../img/stanzeCard/andrea.jpg'
import Meeting from '../../img/stanzeCard/meeting.jpg'
import Flavio from '../../img/stanzeCard/flavio.jpg'
import Laboratory from '../../img/stanzeCard/laboratory.jpg'
import Kitchen from '../../img/stanzeCard/kitchen.jpg'
import Entrance from '../../img/stanzeCard/entrance.jpg'
import Breaktime from '../../img/stanzeCard/breaktime.jpg'
import Openspace from '../../img/stanzeCard/openspace.jpg'

export const ROOMPHOTOS = [
  {
    id: 0,
    src: Andrea
  },
  {
    id: 1,
    src: Meeting
  },
  {
    id: 2,
    src: Flavio
  },
  {
    id: 3,
    src: Laboratory
  },
  {
    id: 4,
    src: Kitchen
  },
  {
    id: 6,
    src: Breaktime
  },
  {
    id: 5,
    src: Entrance
  },
  {
    id: 7,
    src: Openspace
  }
]
export const MODALSTYLE = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border:'none',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};