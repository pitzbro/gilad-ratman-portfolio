const topographies = [
    {
        name: 'The 588 Project',
        alias: '588',
        subtitle: 'Two channel video installation, 8 min, 2009',

        menuObjects: [
            { type: 'video', videos: [{ id: 255742324, aspectRatio: '25.6%'}] },
            { type: 'images', num: 12, 
              captions: [
                'Black Mud, Digital collage, 2009',
                'Study for The 588 Project, 2009',
                'Production still, Studio 588, Arkansas',
                'Deep Sinking culture',
                'Deep Sinking culture',
                'Deep Sinking culture',
                'Bubbling Mud, New Zealand',
                'Deep Sinking culture',
                'The 588 Project, Installation view',
                'The 588 Project, production still',
                'Deep Sinking culture',
                'Study for The 588 Project, 2009'
              ]
              },
            // { type: 'text', textSources: 'english.html' }
            { type: 'text', 
                textSources: [
                  { languages: ['english']}, 
                  { languages: ['hebrew'] } 
                ]}
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
        subtitle: 'video installation, endless loop, wooden structure, 2010',

        menuObjects: [
            { type: 'video', videos: [{ id: 255713168, aspectRatio: '72.1%' }, { id: 139198986, aspectRatio: '53.1%' }]  },
            { type: 'images', num: 13,
              captions: [
                'Multipillory production set',
                'Multipillory production set',
                'Chinese Cangue (Mobile pillory), late nineteenth century',
                'Multipillory production set',
                'Multipillory production set',
                'Multipillory production set',
                'Still from video, detail',
                'Multipillory production set',
                'Stick your face, Maryland Zoo',
                'Installation View, TRAFO Center for Contemporary Art, Szczecin, Poland, 2015',
                'Installation View, TRAFO Center for Contemporary Art, Szczecin, Poland, 2015',
                'Chinese Cangue (Mobile pillory) 1870',
                'Installation View, TRAFO Center for Contemporary Art, Szczecin, Poland, 2015'
              ]
             },
            { type: 'text',
              textSources: [
                { languages: ['english', 'hebrew']}
              ]}
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
        name: 'Five Bands From Romania',
        alias: 'romania',
        subtitle: 'two channel video installation, soundroom, 12 min, 2011-2015',

        menuObjects: [
            { type: 'video',  videos: [{ id: 255795288, aspectRatio: '53.1%'  }, { id: 139391999, aspectRatio: '53.1%' }] },
            { type: 'images', num: 11,
            captions: [
                'Still from Five Bands from Romania',
                'Still from Five Bands from Romania',
                'Installation View, TRAFO Center for Contemporary Art, Szczecin, Poland, 2015',
                'Still from Pink Floyd: Live at Pompeii, 1971',
                'Metallica, Monsters of Rock concert, Moscow, 1991',
                'Five Bands from Romania, Technical layout',
                'The "VOX" club, Suceava, Romania, 2011',
                'Still from Five Bands from Romania',
                'Still from Five Bands from Romania',
                'Installation View, TRAFO Center for Contemporary Art, Szczecin, Poland, 2015',
                'Installation View, TRAFO Center for Contemporary Art, Szczecin, Poland, 2015',
              ]
            },
            { type: 'text',
              textSources: [
                 { languages: ['english', 'hebrew']}
                 ]},
            { type: 'audio' }
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
        subtitle: 'multi channel video installation, 4 min, styrofoam screens, 2015',

        menuObjects: [
            { type: 'video', videos: [{ id: 255751128, aspectRatio: '53.1%'  }, { id: 138648203, aspectRatio: '53.1%'  }] },
            { type: 'images', num: 11,
            captions: [
                'Locust swarming',
                'Franz Reichelt wearing his parachute suit, 1912',
                'Swarm, production set',
                'Swarm, production set',
                'Swarm, production set',
                'Installation View, TRAFO Center for Contemporary Art, Szczecin, Poland, 2015',
                'Installation View, TRAFO Center for Contemporary Art, Szczecin, Poland, 2015',
                'Installation View, TRAFO Center for Contemporary Art, Szczecin, Poland, 2015',
                'Architectural model, Swarm installation',
                'Installation View, TRAFO Center for Contemporary Art, Szczecin, Poland, 2015',
                'Installation View, TRAFO Center for Contemporary Art, Szczecin, Poland, 2015'
              ]
            },
            { type: 'text',
                textSources: [
                { languages: ['english', 'hebrew']}
                ]}
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

function getName(alias) {
    var topography = alias ? topographies.find(topography => topography.alias === alias) : null
    return topography ? topography.name : null
}
function getIndex(alias) {
    var idx = alias ? topographies.findIndex(topography => topography.alias === alias) : null
    // console.log('got this index', idx);
    return idx;
}

export default topographies;

export { topographies, getCurTopography, getCurObjects, getGalleryItem, getSubtitle, getName, getIndex };