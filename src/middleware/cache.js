import apicache from 'apicache';

const cacheInstance = apicache.options({
    debug:true
}).newInstance();

const cacheMinutes = cacheInstance.middleware('5 minutes');

const clearCache = (ruta) => {
    cacheInstance.clear(ruta);
};
export {cacheInstance, cacheMinutes, clearCache};