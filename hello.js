console.log('0');
setTimeout(() => {
    console.log('1');
});
setTimeout(() => {
    console.log('2');
}, 2);
setImmediate(() => {
    console.log('3');
});
console.log('4');