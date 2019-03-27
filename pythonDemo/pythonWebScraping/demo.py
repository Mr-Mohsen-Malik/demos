class map:
  def __init__(self, itr):
    self.a=10
    self.__b=itr
  def get(self):
    return self.a + self.__b

cls = map(10)
try:
 print(cls.a)
except:
	print("not found")

if(not False): (print("not"))
