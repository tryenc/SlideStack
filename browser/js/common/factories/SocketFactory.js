app.factory('Socket', () => {
    if (!window.io) throw new Error('socket.io not found!');
    var socket = window.io(window.location.origin)
    return {
        changeSlide: newIdx => socket.emit('teacher slide change', newIdx),
        onSlideChange: fn => socket.on('slide change', fn),
        shareCode: code => socket.emit('editing code', code),
        onCodeChange: fn => socket.on('code change', fn),
        onCalled: fn => socket.on('called', fn),
        onNotCalled: fn => socket.on('not called', fn),
        joinRoom: obj => socket.emit('request join', obj),
        onStudentJoin: fn => socket.on('student joined', fn),
        onStudentLeft: fn => socket.on('somebody left', fn),
        callOn: id => socket.emit('call on', id),
        endCallOn: id => socket.emit('end call on', id),
        askQuestion: data => socket.emit('question', data),
        questionAsked: fn => socket.on('question asked', fn),
        emitConfusion: student => socket.emit('confusion', student),
        onConfusion: fn => socket.on('student confused', fn),
        retractConfusion: student => socket.emit('understand', student),
        onRetractConfusion: fn => socket.on('student understands', fn)
    }
});
