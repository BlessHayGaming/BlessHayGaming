import _cloneDeep from 'lodash/cloneDeep';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _set from 'lodash/set';

export default {
    methods: {
        $_cloneDeep(...args) {
            return _cloneDeep(...args);
        },
        $_find(...args) {
            return _find(...args);
        },
        $_get(...args) {
            return _get(...args);
        },
        $_set(...args) {
            return _set(...args);
        },
    }
}