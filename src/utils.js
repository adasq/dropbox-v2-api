import tester from 'stream-tester';

/**
* Creates read stream, which generates length-sized stream of characters (sign)
* Total length of stream is (length * sign.length)
*/
function createMockedReadStream(sign, length){
    return tester.createRandomStream(function () {
        return sign;
    }, length);
}

export default {
    createMockedReadStream
}