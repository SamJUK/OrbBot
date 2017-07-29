import shutil
import os, os.path

rootDir = os.path.abspath('.')

if (rootDir.split("\\")[-1] != 'OrbBot'):
	rootDir = os.path.abspath(os.path.join('.', os.pardir))

distribution_path = rootDir + "\\dist\\"
archive_path = rootDir + "\\archive\\"
file_name = len([name for name in os.listdir(archive_path) if os.path.isfile(os.path.join(archive_path, name))])
output_filename = archive_path + str(file_name)

shutil.make_archive(output_filename, 'zip', distribution_path)