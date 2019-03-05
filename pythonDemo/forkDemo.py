import os
def child():
	print("\nA new child", os.getpid())
	os._exit(0)

def parent():
	while True:
		newpid = os.fork()
		if newpid is 0:
			child()
		else:
			pids = (os.getpid(), newpid)
			print("parent: %d, child: %d\n"%pids)
		reply = input("q for quit or c for new fork(new child/copy)")
		if reply is "c":
			continue
		else:
			break

def test(param = "and also you can pass arg if you want."):
	print("\njust testing, you konw import and stuff!!!!\n",param)

# parent()