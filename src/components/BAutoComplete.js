import caretCoordinates from '../assets/caret-coordinates/caret-coordinates';

export default {
    props: {
        items: {
            type: Array,
            default: () => [],
        },
        placeholder: {
            type: String,
            default: "Input any character ...",
        },
        label: {
            type: String,
            default: 'Auto Complete',
        },
        splitCharacter: {
            type: String,
            default: ' ',
        },
        textarea: {
            type: Boolean,
            default: false,
        },
        rows: {
            type: Number,
            default: null,
        },
        cols: {
            type: Number,
            default: null,
        },
    },
    data() {
        return {
            id: 'input-' + parseInt(Math.random() * 1000),
            inputValue: "",
            searchMatch: [],
            selectedIndex: 0,
            clickedChooseItem: false,
            wordIndex: 0
        };
    },
    mounted() {
        const _self = this;
        document.querySelector('#' + this.id)
            .addEventListener('input', function() {
                const caret = caretCoordinates(this, this.selectionEnd);

                if (_self.searchMatch.length > 0) {
                    const element = document.querySelectorAll('.' + _self.id + '-list');

                    if (element[0]) {
                        element[0].style.top = caret.top + 40 + 'px';
                        element[0].style.left = caret.left + 'px';
                    }
                }
            });
    },
    computed: {
        listToSearch() {
            if (typeof this.items !== "undefined" && this.items.length > 0) {
                return this.items;
            } else {
                return [];
            }
        },
        currentWord() {
            return this.inputValue.replace(/(\r\n|\n|\r)/gm, ' ').split(' ')[this.wordIndex];
        },
        inputSplitted() {
            return this.inputValue.replace(/(\r\n|\n|\r)/gm, ' ').split(" ");
        }
    },
    watch: {
        inputValue() {
            this.focus();
            this.selectedIndex = 0;
            this.wordIndex = this.inputSplitted.length - 1;
        }
    },
    methods: {
        highlightWord(word) {
            const regex = new RegExp("(" + this.currentWord + ")", "g");
            return word.replace(regex, '<mark>$1</mark>');
        },
        setWord(word) {
            let currentWords = this.inputValue.replace(/(\r\n|\n|\r)/gm, '__br__ ').split(this.splitCharacter);
            currentWords[this.wordIndex] = currentWords[this.wordIndex].replace(this.currentWord, word + this.splitCharacter);
            this.wordIndex += 1;
            this.inputValue = currentWords.join(this.splitCharacter).replace(/__br__\s/g, '\n');
        },
        moveDown() {
            if (this.selectedIndex < this.searchMatch.length - 1) {
                this.selectedIndex++;
            }
        },
        moveUp() {
            if (this.selectedIndex !== -1) {
                this.selectedIndex--;
            }
        },
        selectItem(index) {
            this.selectedIndex = index;
            this.chooseItem();
        },
        chooseItem(e) {
            this.clickedChooseItem = true;

            if (this.selectedIndex !== -1 && this.searchMatch.length > 0) {
                if (e) {
                    e.preventDefault();
                }
                this.setWord(this.searchMatch[this.selectedIndex]);
                this.selectedIndex = -1;
            }
        },
        focusout(e) {
            setTimeout(() => {
                if (!this.clickedChooseItem) {
                    this.searchMatch = [];
                    this.selectedIndex = -1;
                }
                this.clickedChooseItem = false;
            }, 100);
        },
        focus() {
            this.searchMatch = [];
            if (this.currentWord !== "") {
                this.searchMatch = this.listToSearch.filter(
                    el => el.indexOf(this.currentWord) >= 0
                );
            }
            if (
                this.searchMatch.length === 1 &&
                this.currentWord === this.searchMatch[0]
            ) {
                this.searchMatch = [];
            }
        }
    }
}