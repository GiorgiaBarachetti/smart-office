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
export const CONTAINERBOX ={
  padding: '40px', 
  borderRadius: '6px', 
  bgcolor: 'rgba(211, 211, 211,0.4)', 
  mx: 'auto', 
  width: '90%', 
  ...SHADOWSTYLE
}


import Andrea from '../../img/stanzeCard/andrea.jpg'
import AndreaOn from '../../img/stanzeCard/andreaacc.jpg'
import Meeting from '../../img/stanzeCard/meeting.jpg'
import MeetingOn from '../../img/stanzeCard/meetingacc.jpg'
import Flavio from '../../img/stanzeCard/flavio.jpg'
import FlavioOn from '../../img/stanzeCard/flavioacc.jpg'
import Laboratory from '../../img/stanzeCard/laboratory.jpg'
import LaboratoryOn from '../../img/stanzeCard/laboratoryacc.jpg'
import Kitchen from '../../img/stanzeCard/kitchen.jpg'
import KitchenOn from '../../img/stanzeCard/kitchenacc.jpg'
import Entrance from '../../img/stanzeCard/entrance.jpg'
import EntranceOn from '../../img/stanzeCard/entranceacc.jpg'
import Breaktime from '../../img/stanzeCard/breaktime.jpg'
import BreaktimeOn from '../../img/stanzeCard/breaktimeacc.jpg'
import Openspace from '../../img/stanzeCard/openspace.jpg'
import OpenspaceOn from '../../img/stanzeCard/openspaceacc.jpg'


export const ROOMPHOTOS = [
  {
    id: 0,
    src: {
      off: Andrea,
      on: AndreaOn
    }
  },
  {
    id: 1,
    src: {
      off: Meeting,
      on: MeetingOn
    }
  },
  {
    id: 2,src: {
      off: Flavio,
      on: FlavioOn
    }
  },
  {
    id: 3,
    src: {
      off: Laboratory,
      on: LaboratoryOn
    }
  },
  {
    id: 4,
    src: {
      off: Kitchen,
      on: KitchenOn
    }
  },
  {
    id: 5,
    src: {
      off: Entrance,
      on: EntranceOn
    }
  }
  ,
  {
    id: 6,
    src: {
      off: Breaktime,
      on: BreaktimeOn
    }
  },
  {
    id: 7,
    src: {
      off: Openspace,
      on: OpenspaceOn
    }
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
  p:3,
  borderRadius: 5,
};

export const CONSUMESSTYLE = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  color: 'rgba(238, 231, 225, 0.77)',
  padding: '20px',
  m: '10px',
  alignItems: 'center',
  backgroundColor: 'rgba(79, 64, 61, 0.80)',
  borderRadius: '11px',
  ...SHADOWSTYLE
}

export const TYTLESTYLE = {
  color: 'black',
  mt: '10px',
  variant: 'h1',
  textAlign: 'center'
}