app.factory('Socket', function () {
    if (!window.io) throw new Error('socket.io not found!');
    var socket = window.io(window.location.origin)
    return {
      changeSlide: function(newIdx){
        socket.emit('teacher slide change', newIdx)
      },
      onSlideChange: function(fn){
        socket.on('slide change', fn);
      },
      shareCode: function(code){
        socket.emit('editing code', code);
      },
      onCodeChange: function(fn){
        socket.on('code change', fn);
      },
      onCalled: function(fn){
        socket.on('called', fn);
      },
      onNotCalled: function(fn){
        socket.on('not called', fn);
      },
      joinRoom: function(obj){
        socket.emit('request join', obj);
      },
      onStudentJoin: function(fn){
        socket.on('student joined', fn);
      },
      onStudentLeft: function(fn){
        socket.on('somebody left', fn);
      },
      callOn: function(id){
        socket.emit('call on', id);
      },
      endCallOn: function(id){
        socket.emit('end call on', id);
      }

    };
});
