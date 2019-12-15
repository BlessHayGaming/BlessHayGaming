export default {
    props: {
        transformAll: Object,
        transformHaybale: Object,
        transformText: Object,
    },
    data() {
        return {
            skew: 0,
            skewTimeout: null,
        };
    },
    computed: {
        transformations() {
            let transform = '';
            if (this.transformAll) {
                if (this.transformAll.translateX) {
                    transform += ' translateX('+this.transformAll.translateX+')';
                }
                if (this.transformAll.translateY) {
                    transform += ' translateY('+this.transformAll.translateY+')';
                }
                if (this.transformAll.rotate) {
                    transform += ' rotate('+this.transformAll.rotate+')';
                }
                if (this.transformAll.scale) {
                    transform += ' scale('+this.transformAll.scale+')';
                }
            }
            return {transform};
        },
        haybaleTransformations() {
            let transform = '';
            if (this.transformHaybale) {
                if (this.transformHaybale.translateX) {
                    transform += ' translateX('+this.transformHaybale.translateX+')';
                }
                if (this.transformHaybale.translateY) {
                    transform += ' translateY('+this.transformHaybale.translateY+')';
                }
                if (this.transformHaybale.rotate) {
                    transform += ' rotate('+this.transformHaybale.rotate+')';
                }
                if (this.transformHaybale.scale) {
                    transform += ' scale('+this.transformHaybale.scale+')';
                }
            }
            return {transform};
        },
    },
    watch: {
        transformAll(newVal, oldVal) {
            if ((newVal.translateX || oldVal.translateX) && newVal.translateX !== oldVal.translateX) {
                const newX = parseInt(newVal.translateX) | 0;
                const oldX = parseInt(oldVal.translateX) | 0;
                this.skew = Math.sign(newX-oldX) * 10;

                window.clearTimeout(this.skewTimeout);
                this.skewTimeout = window.setTimeout(() => {
                    this.skew = 0;
                }, 250);
            }
        },
    },
}