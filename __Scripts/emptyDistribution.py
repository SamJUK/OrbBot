import os
import os.path
import shutil

rootDir = os.path.abspath('.')

if (rootDir.split("\\")[-1] != 'OrbBot'):
	rootDir = os.path.abspath(os.path.join('.', os.pardir))

folder = rootDir + '\\dist'
blacklistedDirectorys = [".git"]

for stuff in os.listdir(folder):
	# Delete folders and contents
	if (os.path.isdir(os.path.join(folder, stuff))):
		if (stuff not in blacklistedDirectorys):
			shutil.rmtree(os.path.join(folder, stuff))
	# Delete Files
	elif (os.path.isfile(os.path.join(folder, stuff))):
		os.remove(os.path.join(folder, stuff))
