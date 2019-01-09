const mixins = {
    props : ['value'],
    methods: {
        removeCharacter(str, char_pos)
        {
            let part1 = str.substring(0, char_pos);
            let part2 = str.substring(char_pos + 1, str.length);
            return (part1 + part2);
        }
    }
}
export default mixins