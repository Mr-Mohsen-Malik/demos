 
 function whoCalledMe() {
    console.log('function Caller is', this);
  };



 obj = {
  id: '42',
  whoCalledMe() {
    console.log('Object Caller is', this);
  }
};



whoCalledMe(); //global ref

obj.whoCalledMe(); // object ref

setTimeout(obj.whoCalledMe, 0); // node => setTimeout ref and browser => window/global ref 