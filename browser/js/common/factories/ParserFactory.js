app.factory('Parser', function (marked) {
    return {
        parse: function (string) {
            string = marked(string);
            return string;
        }
    }
})
