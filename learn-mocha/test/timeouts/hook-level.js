describe('a suite of tests', function() {
  beforeEach(function(done) {
    this.timeout(3000); // A very long environment setup.
    setTimeout(done, 2500);
  });

  it('it', function(done) {
    setTimeout(done, 100);
  })
});