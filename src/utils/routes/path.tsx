

export const PATH = {
    main: '/',
    lightsPage: '/lights',
    rooms: '/rooms',    
    coffee: '/coffee',
    printer: '/printer',
    energy: '/energy'
};

export const PATHDROPDOWNROOMS  = {
    andreaOffice: '/lights/ufficioAndrea',
    meetingRoom: '/lights/meetingRoom',
    flavioOffice: '/lights/ufficioFlavio',
    laboratory: '/lights/laboratory',
    kitchen: '/lights/kitchen',
    breaktimeSpace: '/lights/breaktimeSpace',
    entrance: '/lights/entrance',
    openSpace: '/lights/openSpace',
}

export const SIDEBAR = [
    { name: "MAIN", href: PATH.main},
    { name: "LIGHTS", href: PATH.lightsPage},
    { name: "ROOMS", href: PATH.rooms},
    { name: "ANDREA'S OFFICE", href: PATHDROPDOWNROOMS.andreaOffice},
    { name: "MEETING ROOM", href: PATHDROPDOWNROOMS.meetingRoom },
    { name: "FLAVIO'S OFFICE", href: PATHDROPDOWNROOMS.flavioOffice},
    { name: "LABORATORY", href: PATHDROPDOWNROOMS.laboratory},
    { name: "KITCHEN", href: PATHDROPDOWNROOMS.kitchen},
    { name: "BREAKTIME SPACE", href: PATHDROPDOWNROOMS.breaktimeSpace},
    { name: "ENTRANCE", href: PATHDROPDOWNROOMS.entrance},
    { name: "OPEN SPACE", href: PATHDROPDOWNROOMS.openSpace},
    { name: "COFFEE", href: PATH.coffee},
    { name: "PRINTER", href: PATH.printer},
    { name: "ENERGY", href: PATH.energy}
]