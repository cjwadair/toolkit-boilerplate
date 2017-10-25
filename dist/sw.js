importScripts('workbox-sw.prod.v2.1.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "index.html",
    "revision": "0d10b9b4b54fb29dc99e1ae6d9cab349"
  },
  {
    "url": "scripts/app.js",
    "revision": "45b313ffb6a6f6ec107a2c24a5e09ee4"
  },
  {
    "url": "styles/ie8.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "styles/ie9.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "styles/styles.css",
    "revision": "af6a587cb9d7df355fe0eb22f8f05627"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
