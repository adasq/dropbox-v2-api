var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var async = require('async');
var _ = require('underscore');
const compressor = require('compress-json');
//-------------------------------------------

var $,
    HEADER_AUTH = '--header \"Authorization: Bearer',
    HEADER_CT_OCTET_STREAM = '--header \"Content-Type: application/octet-stream',
    ENDPOINT_RPC = 'api.dropboxapi.com',
    ENDPOINT_CONTENT = 'content.dropboxapi.com',
    utils = {
        contains: function (text, sub) {
            return (text.indexOf(sub) > -1);
        },
        hasClass: function (className, classText) {
            return classText.trim().split(' ').indexOf(className) > -1;
        },
        getTextNode: function (arr) {
            var node = _.filter(arr, function (item) {
                return item.type === 'text';
            });
            return _.pluck(node, 'data').join(' ').trim();
        }
    };

module.exports = generateApiDescription2

async function generateApiDescription2(cb) {
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
        // fs.writeFileSync('./dist/api.json', JSON.stringify(apiExamples, null, '\t'));
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

//-------------------------------------------

function getAPIDescriptionElems() {
    var resp = $('.documentation__routes');
    var namespaces = _.map(resp.children(), function (sectionChild) {
        var namespace = {
            name: sectionChild.attribs.id.replace(/\s/, ''),
        };
        var methodDescWrapElems = _.map(sectionChild.children, function (child, i) {
            if (child.attribs && child.attribs.class && utils.hasClass('toc-el', child.attribs.class)) {
                return child;
            }
        });
        namespace.el = _.compact(methodDescWrapElems);
        return namespace;
    });
    return namespaces;
}

function getTextByElem(el) {
    el.find('br').replaceWith('\n');
    const links = el.find('a');
    let text = el.text();
    if (links.length > 0) {
        _.each(links, (link, i) => {
            link = links.eq(i);
            const linkText = link.text();
            const linkHref = link.attr('href').replace(/-/g, '');
            if ('#' + linkText === linkHref || linkHref[0] !== '#') return;
            link.text(`[${linkText}](${linkHref}-see-docs)`);
        });
    }
    text = el.text();
    return text.replace(/\n/g, ' ').trim();
}

function getTextByElem2(el) {
    return el.text().trim().replace(/\\s+/g, ' ');
}

function getExampleData(el) {
    return el.find('pre').text();
}

function getReturns(el) {
    const parametersExample = el.find('.literal-block').eq(0).text();
    let parametersExampleObject = null;
    if (parametersExample.length > 0) {
        parametersExampleObject = JSON.parse(parametersExample);
    }
    return parametersExampleObject;
}

function getParameterList(el) {

    const parametersExample = el.find('.literal-block').eq(0).text();
    let parametersExampleObject = null;
    if (parametersExample.length > 0) {
        parametersExampleObject = JSON.parse(parametersExample);
    }

    return {
        list: getParameterListInner(el),
        example: parametersExampleObject
    };

    function getParameterListInner(el) {
        return _.map(el.find('.field'), function (item) {
            var desc = utils.getTextNode(item.children);
            item = $(item);
            var nestedWrap = item.find('.nested-child');
            if (!!nestedWrap.length) {
                const name = item.find('b code').eq(0).text();
                return {
                    name,
                    type: item.find('.type').eq(0).text(),
                    desc: desc,
                    parameters: _.flatten(_.map(nestedWrap, function (item) {
                        return getParameterList($(item))
                    }))
                };
            } else {
                const name = item.find('b code').text();
                return {
                    name,
                    type: item.find('.type').text(),
                    desc: desc
                };
            }

        });
    }
}

function parseMethodElement(wrap) {
    var parsers = {
        'Description': getTextByElem,
        'URL Structure': getTextByElem2,
        'Parameters': getParameterList,
        'Returns': getReturns,
        'Endpoint format': function (elem) {
            const endpointCategory = elem.text().trim().toLowerCase();
            const categories = {
                'rpc': 'RPC',
                'content-upload': 'UPLOAD',
                'content-download': 'DOWNLOAD'
            };
            return categories[endpointCategory] || null;
        },
        'Example': getExampleData
    };

    var h3 = wrap.find('h3');
    var dl = wrap.find('dl');

    var dts = $(dl).find('dt');

    var apiMethod = {
        name: h3.text()
    };
    _.each(dts, function (dt, i) {
        var name = $(dts[i]).text();
        var valueEl = $(dt.nextSibling.nextSibling);
        if (parsers[name]) {
            var value = parsers[name](valueEl);
            apiMethod[name] = value
        } else {
            // console.log('no parser for', name);
        }
    });
    return apiMethod;
}

function generateApiDescription(cb) {
    request('https://www.dropbox.com/developers/documentation/http/documentation', function (err, resp, body) {
        if (err) {
            console.log('could not retrive documentaion page...');
            return cb ? cb(err) : err;
        }
        parseBody(body);
    });

    function parseBody(body) {
        $ = cheerio.load(body);
        var fullApi = _.map(getAPIDescriptionElems(), function (section) {
            return {
                name: section.name,
                methods: _.map(section.el, function (el) {
                    var methodDescription = parseMethodElement($(el));
                    return methodDescription;
                })
            };
        });
        const fullApiObject = parseApiDescription(fullApi);
        const fullApiContent = JSON.stringify(fullApiObject, null, '\t');

        const apiObject = createApiObject(fullApiObject);
        const apiContent = JSON.stringify(apiObject, null, '\t');

        if (cb) {
            cb(null, fullApiContent);
        } else {
            fs.writeFileSync('./dist/api.json', apiContent);
            fs.writeFileSync('./dist/api-examples.json', fullApiContent);
        }

        console.log('api description has been generated...');

    }
}

function createApiObject(fullApiObject) {
    Object.keys(fullApiObject).forEach((name => {
        const apiDescription = fullApiObject[name];
        delete apiDescription.description;
        delete apiDescription.returnParameters;
        delete apiDescription.parameters.example;
        apiDescription.parameters.available = apiDescription.parameters.list.length > 0;
        delete apiDescription.parameters.list;

    }));
    return fullApiObject;
}

function parseApiDescription(apiDescription) {
    var parsedApiDescription = {};
    _.each(apiDescription, function (namespace) {
        var namespaceName = namespace.name;
        _.each(namespace.methods, function (method) {

            var methodName = method.name.substr(1);
            var resourceName = [namespaceName, methodName].join('/');

            var methodUri = method['URL Structure'];
            var methodExample = method['Example'] || null;
            var methodParameters = method['Parameters'] || [];
            var returnParameters = method['Returns'] || null;
            var endpointFormat = method['Endpoint format'] || null;
            var description = method['Description'] || null;

            var requiresAuthHeader = methodExample === null ? true : utils.contains(methodExample, HEADER_AUTH);
            var requiresReadableStream = methodExample === null ? false : utils.contains(methodExample, HEADER_CT_OCTET_STREAM);

            parsedApiDescription[resourceName] = {
                uri: methodUri,
                requiresAuthHeader: requiresAuthHeader,
                requiresReadableStream: requiresReadableStream,
                category: endpointFormat,
                description: description,
                parameters: methodParameters,
                returnParameters: returnParameters
            };
        });
    });
    return parsedApiDescription;
}
