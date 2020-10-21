import baseComponent from '../mixins/text-field-mixins'

export default {
    mixins: [baseComponent],
    props: {
        type: {
            type: String,
            default: 'text',
        },
        min: {
            type: Number / String,
            default: null,
        },
        maxlength: {
            type: Number / String,
            default: null,
        },
        classParent: {
            type: String,
            default: '',
        },
        regex: {
            default: ''
        },
        url: {
            type: String,
            default: '',
        },
        autocomplete: {
            type: String,
            default: '',
        },
        hasUrl: {
            default: false
        },
        targetBlank: {
            default: true
        },
        negative: {
            default: true
        },
        required: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        /**
         * @inheritDoc
         */
        classes() {
            return `${this.className || ''} b__input 2`
        },
        /**
         * @inheritDoc
         */
        hasLinkView() {
            return this.hasUrl && this.disabled
        }
    },
    methods: {
        /**
         * @inheritDoc
         */
        updateFloatLabel(value) {
            const isEmpty = value == undefined || value == null || value == '' ? true : false;
            this.classLabel = isEmpty ? '' : 'active'
        },
        /**
         * @inheritDoc
         */
        change(value) {
            this.updateFloatLabel(value);
            this.$emit('input', value);
        },
        /**
         * @inheritDoc
         */
        keyupEnter: function(e) {
            const keyCode = e.keyCode || e.which;
            if (keyCode === 13) {
                e.preventDefault();
                this.$emit('keyup-enter');
                return false;
            }
        },
        /**
         * @inheritDoc
         */
        keyDownRegex: function(e) {
            const keyCode = e.keyCode || e.which;

            let pattern = new RegExp(this.regex);
            if (!!this.regex) {

                const value = $(e.target).val() + e.key
                let res = pattern.test(value);
                if (!res && keyCode != 8 && keyCode != 37 && keyCode != 39) {
                    e.preventDefault();
                    return false;
                }
            }

            // Don't validate the input if below arrow, delete and backspace keys were pressed
            if (keyCode != 37 && keyCode != 38 && keyCode != 39 && keyCode != 40 && keyCode != 46 && keyCode != 8) { // Left / Up / Right / Down Arrow, Delete keys;
                let keyCharacter = e.key;
                if (!!this.regex) {
                    let res = pattern.test(keyCharacter);
                    if (!res) {
                        e.preventDefault();
                        return false;
                    }
                }
            }
        }
    }
}