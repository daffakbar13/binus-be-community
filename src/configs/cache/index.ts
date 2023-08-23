import NodeCache from 'node-cache'

export const cache = new NodeCache({ deleteOnExpire: true, useClones: true })
