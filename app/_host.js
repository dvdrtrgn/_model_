var Host = {
    _: { /// any top level host
        nom: '*',
    },
    'www.wellsfargomedia.com': {
        nom: 'wfmedia',
        sub: '/_model_',
    },
    'ecg.hosting.wellsfargo.com': {
        lib: '//www.wellsfargomedia.com/lib',
        nom: 'mfal',
        sub: '/mfal/foo/bar',
    },
    '10.89.101.100': {
        nom: 'qla2',
        sub: '/wf-ecg/_model_',
    },
    'localhost:8000': {
        nom: 'localhost',
        sub: '/wf-ecg/_model_/app',
    },
    'localhost:8999': {
        nom: 'localhost',
    },
};
