import json

x = {
  "name": "John",
  "age": 30,
  "married": True,
  "divorced": False,
  "children": ("Ann","Billy"),
  "pets": None,
  "cars": [
    {"model": "BMW 230", "mpg": 27.5},
    {"model": "Ford Edge", "mpg": 24.1}
  ],
  "fun":"somvale"
}

def fun():
	print("this is function.")


x["fun"] = fun
print (x["fun"]())
print("\n pyth x :\n",x)
print("\n json x :\n",json.dumps(x))

# -------------------------------------------------
# from forkDemo import test

# test("ok i have passed an arg")

# --------------------------------------------------
# class Person:
# 	name = "Person"
# 	def __init__(self, name):
# 		self.name = name
# 	def get(self):
# 		return [ self.name]

# p = Person("p")

# print(p.get())

# ---------------------------------------------------
# class MyNumbers:
#   def __iter__(self):
#     self.a = 1
#     return self

#   def __next__(self):
#     x = self.a
#     self.a += 1
#     return x

# myclass = MyNumbers()
# myiter = iter(myclass)

# print(next(myiter))
# print(next(myiter))
# print(next(myiter))
# print(next(myiter))
# print(next(myiter))
# print(next(myiter))
# print(next(myiter))
# print(next(myiter))
# print(next(myiter))
# print(next(myiter))
# print(next(myiter))
# print(next(myiter))
# print(next(myiter))
# print(next(myiter))
# print(next(myiter))