

export const PATH = {
    main: '/',
    lightsPage: '/lights',
    //rooms: '/rooms',    
    coffee: '/coffee',
    niveus: '/niveus',
    printer: '/printer',
    energy: '/energy'
};

export const PATHDROPDOWNROOMS  = {
    andreaOffice: '/lights/ufficioAndrea',
    meetingRoom: '/lights/meetingRoom',
    flavioOffice: '/lights/ufficioFlavio',
    laboratory: '/lights/laboratory',
    kitchen: '/lights/kitchen',
    entrance: '/lights/entrance',
    breaktimeSpace: '/lights/breaktimeSpace',
    openSpace: '/lights/openSpace',
}

export const SIDEBAR = [
    { name: "MAIN", href: PATH.main},
    { name: "LIGHTS", href: PATH.lightsPage},
   // { name: "ROOMS", href: PATH.rooms},
    { name: "COFFEE", href: PATH.coffee},
    { name: "NIVEUS", href: PATH.niveus},
    { name: "PRINTER", href: PATH.printer},
    { name: "ENERGY", href: PATH.energy}
]

export const SIDEBARROOMS = [
    { name: "ANDREA'S OFFICE", href: PATHDROPDOWNROOMS.andreaOffice},
    { name: "MEETING ROOM", href: PATHDROPDOWNROOMS.meetingRoom },
    { name: "FLAVIO'S OFFICE", href: PATHDROPDOWNROOMS.flavioOffice},
    { name: "LABORATORY", href: PATHDROPDOWNROOMS.laboratory},
    { name: "KITCHEN", href: PATHDROPDOWNROOMS.kitchen},
    { name: "ENTRANCE", href: PATHDROPDOWNROOMS.entrance},
    { name: "BREAKTIME SPACE", href: PATHDROPDOWNROOMS.breaktimeSpace},
    { name: "OPEN SPACE", href: PATHDROPDOWNROOMS.openSpace},
]