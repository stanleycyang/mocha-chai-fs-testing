var expect = require('chai').expect,
    tags = require('../lib/tags.js');

describe('Tags', function(){
    describe('#parse()', function(){
        it('should parse long formed tags', function(){
            var args = ["--depth=4", "--hello=world"];
            var results = tags.parse(args);

            expect(results).to.have.a.property("depth", 4);
            expect(results).to.have.a.property("hello", "world");
        });

        it('should fallback to defaults', function(){
            var args = ["--depth=4", "--hello=world"];
            var defaults = {depth: 2, foo: 'bar'};
            var results = tags.parse(args, defaults);

            var expected = {
                depth: 4,
                foo: 'bar',
                hello: 'world'
            };

            // Matches two objects
            expect(results).to.deep.equal(expected);
        });

        it('should accept tags without values as a boolean', function(){
            var args = ['--searchContents'];
            var results = tags.parse(args);
            expect(results).to.have.a.property('searchContents', true);
        });

    });
});


