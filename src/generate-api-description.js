import request from 'request';
import fs from 'fs';
import compressor from 'compress-json';
//-------------------------------------------
export default generateApiDescription;

async function generateApiDescription(cb) {
    const NAMESPACES = ['account', 'auth', 'check', 'contacts', 'file_properties', 'file_requests', 'files', 'sharing', 'users']
    let error = null;
    const apiExamples = {};

    try {
        for (let i = 0; i < NAMESPACES.length; i++) {
            const namespace = NAMESPACES[i];
            const endpoints = await fetchNamespace(namespace);
            endpoints.forEach(endpoint => {
                const key = `${namespace}/${endpoint.name}${endpoint.version === 1 ? '' : `_v${endpoint.version}`}`;
                apiExamples[key] = {
                    key,
                    ...endpoint
                }
            })
        }
    } catch (err) {
        error = err;
        console.log(error)
    }

    if (cb) {
        cb(error, apiExamples);
    } else {
        fs.writeFileSync('./src/api.json', JSON.stringify(compressor.compress(apiExamples)));
    }
}

function fetchNamespace(NAMESPACE) {
    const CSFR = 'PlVbZNc_MK8fTovNsjHXdXGa';
    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            uri: 'https://www.dropbox.com/2/api_developers/get_namespace_routes',
            json: true,
            headers: {
                cookie: `t=${CSFR}`,
                'x-csrf-token': CSFR
            },
            body: ({
                mode: "external",
                p_namespace: NAMESPACE
            })
        }, function (err, resp, body) {
            if (err) return reject(err);
            body.route_groups = JSON.parse(body.route_groups);
            resolve(body.route_groups.map(a => a.routeVersions).flat());
        })
    })
}