describe('a suite of tests', function() {
  this.timeout(300);

  it('should take less than 300ms', function(done){
    setTimeout(done, 300);
  });

  it('should take less than300ms as well', function(done){
    setTimeout(done, 250);
  });
})