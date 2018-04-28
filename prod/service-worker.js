/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/css/libs.min.css","8d8e56eea8bef8fa86e0b0adfb8c319e"],["/css/style.min.css","84980c5b4c8e03137248360d21c2e216"],["/fonts/AvenirNextCyr-Bold.eot","cd1b4c6212d736229312a937412eedea"],["/fonts/AvenirNextCyr-Bold.ttf","cb5f2e91d0edea79307ffa674c219a1d"],["/fonts/AvenirNextCyr-Bold.woff","2dcf2324d8c5365339b70433bcd952e4"],["/fonts/AvenirNextCyr-BoldItalic.eot","cdbdf32b3d9d478a11653f0bb9872a6b"],["/fonts/AvenirNextCyr-BoldItalic.ttf","6f558bba0e1dedc912497c80d4fe2228"],["/fonts/AvenirNextCyr-BoldItalic.woff","348ecb6dc6cac231aaaa725321aea3a0"],["/fonts/AvenirNextCyr-Demi.eot","96adc4bebb865e2bc3c135105c2ffe66"],["/fonts/AvenirNextCyr-Demi.ttf","104be5f79e3ef6239d62bd897fde8d91"],["/fonts/AvenirNextCyr-Demi.woff","fe6d7419dcc1b01901050f02303ea003"],["/fonts/AvenirNextCyr-DemiItalic.eot","0a25bfd770c0f66c09139d5cc7b4daeb"],["/fonts/AvenirNextCyr-DemiItalic.ttf","5279d5a5c82ae79515ecaf462d0357c1"],["/fonts/AvenirNextCyr-DemiItalic.woff","405ae9542dcd314ff574920cf4c39114"],["/fonts/AvenirNextCyr-Heavy.eot","c7c48f65258ec9fa781d5bd63325e191"],["/fonts/AvenirNextCyr-Heavy.ttf","b14619f5cc83d46590b825555375cd36"],["/fonts/AvenirNextCyr-Heavy.woff","639aa9c29711f3129ec5d80d901e22ab"],["/fonts/AvenirNextCyr-HeavyItalic.eot","c00d51e26a2c231ac479ede7788cd888"],["/fonts/AvenirNextCyr-HeavyItalic.ttf","e962563da9bae7e5165ee4a0f61d9aee"],["/fonts/AvenirNextCyr-HeavyItalic.woff","2ec1507802262ee3d4d8b8cac1507c67"],["/fonts/AvenirNextCyr-Italic.eot","5de772963e18f14966e61d2bae8bfda4"],["/fonts/AvenirNextCyr-Italic.ttf","51972d571dc4fbd6faff884ffa007c29"],["/fonts/AvenirNextCyr-Italic.woff","3e31fb5719598f7d79c0eaa003991a62"],["/fonts/AvenirNextCyr-Light.eot","e343ba2c0a81c8ea4aea9bbb0f2ddb0f"],["/fonts/AvenirNextCyr-Light.ttf","c91f454865c62e8e068ce224a49fccc9"],["/fonts/AvenirNextCyr-Light.woff","2bda12c6f0fc7cdcf3f70b3225e39d52"],["/fonts/AvenirNextCyr-LightItalic.eot","95939d3fba08e42132eb028cc2970997"],["/fonts/AvenirNextCyr-LightItalic.ttf","64954fb75330e520cab5684ace47da79"],["/fonts/AvenirNextCyr-LightItalic.woff","0ebbb046ddc2704add68c609f8c5fd3e"],["/fonts/AvenirNextCyr-Medium.eot","576011fe6e1aa00766f8521305d6602b"],["/fonts/AvenirNextCyr-Medium.ttf","862c7c4267856b43beabe738a13c281e"],["/fonts/AvenirNextCyr-Medium.woff","241293dd350f84881201063e58f13109"],["/fonts/AvenirNextCyr-MediumItalic.eot","063f62c17593b8d4080993e85c6c1d8a"],["/fonts/AvenirNextCyr-MediumItalic.ttf","f2fc32fb724bca617be17961d4a846d2"],["/fonts/AvenirNextCyr-MediumItalic.woff","33b8aaeaa36918de0830703cb530898e"],["/fonts/AvenirNextCyr-Regular.eot","4171ed3ba504b1da3b601a6b52e94dce"],["/fonts/AvenirNextCyr-Regular.ttf","97b615b907fd3510f9129eac4a731f6f"],["/fonts/AvenirNextCyr-Regular.woff","a81229c89f968c0b8eb6544e2a90d17a"],["/fonts/AvenirNextCyr-Thin.eot","2c2afac99d68168fc5acbe4cc9987d31"],["/fonts/AvenirNextCyr-Thin.ttf","c48a8c06a18f630b38b0fa5f19ffc0d2"],["/fonts/AvenirNextCyr-Thin.woff","a3de855ab1f8b0095490c30d9a888bb7"],["/fonts/AvenirNextCyr-ThinItalic.eot","afd4120fe4125d1725b9ca65b7ef78fc"],["/fonts/AvenirNextCyr-ThinItalic.ttf","bb97e3a1dc8431300de8af6b4862dda2"],["/fonts/AvenirNextCyr-ThinItalic.woff","a20377e2e35c0c9b514194619665defc"],["/fonts/AvenirNextCyr-UltraLight.eot","2b9960b9669b9f65f78df5c83b9c40c9"],["/fonts/AvenirNextCyr-UltraLight.ttf","1a44681e3536dc4ddee2196d96ae2169"],["/fonts/AvenirNextCyr-UltraLight.woff","decf8516e2fff3aa12211d6b4cb18e42"],["/fonts/AvenirNextCyr-UltraLightIt.eot","3a8ca6942a3980fac50e74cacaed6862"],["/fonts/AvenirNextCyr-UltraLightIt.ttf","e2651b88579ab90cb3be5c8efafe25b6"],["/fonts/AvenirNextCyr-UltraLightIt.woff","533232314791701727b240ed84c3628c"],["/fonts/stylesheet.css","681a852231cc09aa291bb2d7c3de3e41"],["/img/diagonal.png","244cd893ae4aea80c0498f61785c9e16"],["/img/slider.jpg","8dec3950244b19a6bd27c68432e5667e"],["/img/t1.png","deb019cdef755bfbbc6b88e1cbe8e68b"],["/img/t2.png","13fdf38329e9716f60e8f3fb0c41d2de"],["/img/t3.png","7d7d1d8bd2d92bc38846ce04f1110c2f"],["/img/t4.png","67c67bf6056a182c4c730f2ffb8e912a"],["/index.html","b990dc826d4eb1b9772e80e20ee63309"],["/js/common.min.js","05bbceef9000858d5eecdeac1c12a6e2"],["/js/libs.min.js","2499fac844f6eed7721405d785dfd809"],["/manifest.json","cd97fb57f20e6b285fc5398738a312e3"],["/personal-area-personal.html","8d2f5e86873b9877aaea39dc2ce49cf8"],["/personal-area-ref.1.html","4ee30863fbb5f949790598f2caf58c3b"],["/personal-area-ref.html","4ee30863fbb5f949790598f2caf58c3b"],["/personal-area-sponsor.html","31fc6214ecb6b945a660f438d7634999"],["/personal-area-tarif.html","5cc4a31d1acf00a304b74273e72b22b5"],["/personal-area.html","29477d1976ed1ec72ffcd8b2b931b941"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







