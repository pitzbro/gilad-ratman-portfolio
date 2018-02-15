const topographies = [
    {
        name: 'The 588 Project',
        alias: '588',
        subtitle: 'Two channel video installation - 8 min. 2009',

        menuObjects: [
            { type: 'video', id: 255742324, aspectRatio: '25.6%' },
            { type: 'video', id: 255742324, aspectRatio: '53.1%' },
            { type: 'text', src: 'english.html' }
        ],

        // GLOBALS

        //topography
        topographyHeight: 875,
        topographyIntensity: 1.2,

        //textures
        texturesRepeat: 6,

        //fog
        fogIntensity: 2000,
        fogColor: 0x000000,

        //camera
        cameraHeight: 840,
        cameraTilt: 1500,
        cameraPan: -1500,

        //lights

        lightAmbientColor: 0xffffff,
        lightDirectionalColor: 0xffffff,
        lightPointColor: 0xffffff

    },

    {
        name: 'Multipillory',
        alias: 'multipillory',
        subtitle: 'Video installation - wooden structure, endless loop - 2010',

        menuObjects: [
            { type: 'video', id: 255713168, aspectRatio: '72.1%' },
            { type: 'video', id: 255713168, aspectRatio: '72.1%' },
            { type: 'text', src: 'content.html' },
        ],

        // GLOBALS

        //topography
        topographyHeight: 450,
        topographyIntensity: 1.5,

        //textures
        texturesRepeat: 6,

        //fog
        fogIntensity: 2470,
        fogColor: 0xc1987e,

        //camera
        cameraHeight: 1500,
        cameraTilt: 1500,
        cameraPan: -1500,

        //lights

        lightAmbientColor: 0xffffff,
        lightDirectionalColor: 0xffffff,
        lightPointColor: 0x527238
    },

    {
        name: '5 Bands From Romania',
        alias: 'romania',
        subtitle: 'Two channel video installation with soundroom, 12 min. - 2011-2015',

        menuObjects: [
            { type: 'video', id: 255795288, aspectRatio: '53.1%' },
            { type: 'video', id: 255795288, aspectRatio: '53.1%' },
            { type: 'video', id: 255795288, aspectRatio: '53.1%' },
            { type: 'text', src: 'english.html' }
        ],

        //topography
        topographyHeight: 375,
        topographyIntensity: 1.5,

        //textures
        texturesRepeat: 6,

        //fog
        fogIntensity: 2050,
        fogColor: 0x291f1d,

        //camera
        cameraHeight: 1500,
        cameraTilt: 1500,
        cameraPan: -1070,

        //lights

        lightAmbientColor: 0xffffff,
        lightDirectionalColor: 0xffffff,
        lightPointColor: 0xffffff
    },

    {
        name: 'Swarm',
        alias: 'swarm',
        subtitle: 'Multi channel video installation - styrofoam screens, 4 min. - 2015',

        menuObjects: [
            { type: 'video', id: 255751128, aspectRatio: '53.1%' },
            { type: 'video', id: 255751128, aspectRatio: '53.1%' },
            { type: 'text', src: 'english.html' }
        ],

        // GLOBALS

        //topography
        topographyHeight: 325,
        topographyIntensity: 1.8,

        //textures
        texturesRepeat: 6,

        //fog
        fogIntensity: 2100,
        fogColor: 0x1f1b20,

        //camera
        cameraHeight: 1590,
        cameraTilt: 1190,
        cameraPan: -1840,

        //lights

        lightAmbientColor: 0xf5f6ff,
        lightDirectionalColor: 0xffffff,
        lightPointColor: 0x838383
    },
];

function getCurTopography(alias) {
    return alias ? topographies.find(topography => topography.alias === alias) : null
}

function getCurObjects(alias) {
    var topography = alias ? topographies.find(topography => topography.alias === alias) : null
    return topography ? topography.menuObjects : null
}

function getGalleryItem(alias, num) {
    var topography = alias ? topographies.find(topography => topography.alias === alias) : null
    return (topography && num) ? topography.menuObjects[num] : null
}

function getSubtitle(alias) {
    var topography = alias ? topographies.find(topography => topography.alias === alias) : null
    return topography ? topography.subtitle : null
}
function getIndex(alias) {
    var idx = alias ? topographies.findIndex(topography => topography.alias === alias) : null
    // console.log('got this index', idx);
    return idx;
}

export default topographies;

export { topographies, getCurTopography, getCurObjects, getGalleryItem, getSubtitle, getIndex };