let Draw =
    {
        drawLineSeparator: function()
        {
            console.log(this.lineSeparator.separator.repeat(this.lineSeparator.length));
        },

        drawCell: function(data, width, separator = '')
        {
            data = String(data);
            if (data.length > width) {
                return data.slice(0, width)
            }
            let lengthDiff = parseInt(width - data.length);
            let isEven = lengthDiff % 2 === 0;
            let spaceLength = isEven ? lengthDiff / 2 : (lengthDiff - 1) / 2;
            let space = ' ';
            space = space.repeat(spaceLength);
            let result = separator + space + data + space;
            return isEven ? result : result  + ' ';
        },

        lineSeparator: {length: 103, separator: '-'}
    };

module.exports = Draw;